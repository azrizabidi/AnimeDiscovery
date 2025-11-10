import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// --- Type Definitions ---

// A more detailed type for an anime, based on the Jikan API response
export interface Anime {
  mal_id: number;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  synopsis: string | null;
  score: number | null;
}

interface AnimeState {
  results: Anime[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  // Add a state to track if there are no results for a successful query
  noResults: boolean;
}

// --- Jikan API Response Types ---
interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
}

interface JikanResponse {
  data: Anime[];
  pagination: JikanPagination;
}

// --- Redux Thunk for Searching Anime ---
export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page = 1 }: { query: string; page?: number }, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}&limit=12`, { signal });

      // Handle rate limiting
      if (response.status === 429) {
        return rejectWithValue('You are being rate-limited. Please wait a moment before searching again.');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data: JikanResponse = await response.json();

      // The Jikan API returns a `data` property which is an array of results.
      // We perform a basic validation check here.
      if (!data || !Array.isArray(data.data)) {
        throw new Error('Received malformed data from the API.');
      }
      // Return both the results and pagination info
      return { results: data.data, pagination: data.pagination };
    } catch (error: any) {
      // Handle fetch cancellation
      if (error.name === 'AbortError') {
        // We don't need to reject, as this is an expected cancellation.
        // Redux Toolkit will automatically ignore the promise.
        console.log('Fetch aborted:', query);
        // We throw a special error that the reducer will ignore
        throw new Error('Aborted');
      }
      // For other errors, we pass a user-friendly message.
      return rejectWithValue(error.message || 'An unknown network error occurred.');
    }
  }
);

const initialState: AnimeState = {
  results: [],
  loading: 'idle',
  error: null,
  // --- Pagination State ---
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  // We'll also store the current query to use it for pagination
  currentQuery: '',
  noResults: false,
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    // Action to clear search results and errors, e.g., when the input is cleared
    clearSearch: (state) => {
      state.results = [];
      state.error = null;
      state.loading = 'idle';
      state.noResults = false;
      state.currentQuery = '';
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
        state.noResults = false;
        // Store the query that initiated this search
        state.currentQuery = action.meta.arg.query;
      })
      .addCase(searchAnime.fulfilled, (state, action: PayloadAction<{ results: Anime[], pagination: JikanPagination }>) => {
        state.loading = 'succeeded';
        state.results = action.payload.results;
        state.noResults = action.payload.results.length === 0;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        // Only set the error state if it's not a cancellation
        if (action.error.message !== 'Aborted') {
          state.loading = 'failed';
          state.error = (action.payload as string) || action.error.message || 'Failed to fetch anime.';
        }
      });
  },
});

export const { clearSearch } = animeSlice.actions;
export default animeSlice.reducer;