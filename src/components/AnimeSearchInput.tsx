import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { searchAnime, clearSearch } from '@/store/animeSlice';

const DEBOUNCE_DELAY = 250; // ms

/**
 * A reusable search input component that debounces user input,
 * handles API request cancellation, and dispatches a Redux action.
 */
const AnimeSearchInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Create an AbortController for this request
    const abortController = new AbortController();
    const { signal } = abortController;

    const debounceTimer = setTimeout(() => {
      const trimmedQuery = query.trim();
      // Only trigger a search if the query is long enough
      if (trimmedQuery.length > 2) {
        // Dispatch the search action, passing the signal in the options object
        dispatch(searchAnime({ query: trimmedQuery, page: 1 }, { signal }));
      } else if (trimmedQuery.length === 0) {
        dispatch(clearSearch());
      }
    }, DEBOUNCE_DELAY);

    // --- Cleanup Function ---
    // This runs when the effect is re-triggered (i.e., when `query` changes)
    // or when the component unmounts.
    return () => {
      clearTimeout(debounceTimer); // Clear the scheduled search
      abortController.abort(); // Abort the in-flight request
    };
  }, [query, dispatch]); // Effect dependencies

  return (
    <Input
      type="text"
      placeholder="Search for 'Anime'..."
      className="max-w-lg mx-auto text-lg p-6 rounded-full shadow-lg focus-visible:ring-offset-4"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default AnimeSearchInput;