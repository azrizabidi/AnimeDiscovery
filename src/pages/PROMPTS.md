# PROMPTS.md

### Prompts Used


### Prompt 1: Implement Basic Routing Using `react-router-dom` For Routing

Create two main pages using react-router-dom:
- `/` : `MainSearchPage`: Includes a placeholder for an anime search input and search results.
- `/anime/:id` : `DetailsPage`: Displays the selected anime ID from the URL parameters.

### Prompt 2: Setup Tailwind CSS

Configure the project to use Tailwind CSS. Create the necessary `tailwind.config.js` and `postcss.config.js` files and update `index.css` with the base Tailwind directives.

### Prompt 3: Implement a Modern UI with Bonus Features

- Implement a fully responsive layout using Tailwind and Shadcn UI components.

- Add a unique "wow" factor such as smooth transitions, glassmorphism, or subtle motion effects using Framer Motion.

- Include skeleton loaders for search results and the details page with meaningful loading states.

- Use a consistent dark mode theme with accent colors, inspired by modern anime sites.

### Prompt 4: Configure Path Aliases

- Configure the project to resolve `@/*` to `src/*` in both `tsconfig.json` and `vite.config.ts`.

### Prompt 5: Create a Debounced Search Input

- Create a reusable `AnimeSearchInput` component that:
    - Debounces user input by 250ms.
    - Cancels previous API requests using `AbortController`.
    - Uses React hooks only (no external state for input).
    - Is designed to trigger a search action through Redux when the query updates.

### Prompt 6: Set Up Redux Toolkit

- Set Up Redux Toolkit
- Create a `store` directory with an `index.ts` file to configure the store.
- Create an `animeSlice.ts` file inside the store directory.
- Provide the store to the entire application in `main.tsx`.

### Prompt 7: Implement the Redux Slice with API Logic

Implement the `animeSlice.ts` to:
    - Perform an async search using the Jikan API (`https://api.jikan.moe/v4/anime`).
    - Use `createAsyncThunk` with `signal` for request cancellation.
    - Handle loading, success, and error states properly.
    - Include robust error handling for network failures, rate limiting (HTTP 429), and malformed API responses.
    - Handle pagination state (`currentPage`, `totalPages`, `hasNextPage`).
    - Add a `clearSearch` reducer to reset the state.

### Prompt 9: Connect the UI to Redux and Implement Pagination

Refactor `MainSearchPage.tsx` to:
    - Use `useSelector` to get `results`, `loading`, `error`, `noResults`, and pagination state from the Redux store.
    - Display the anime image and title for each result.
    - Render UI for the `error` and `noResults` states.
    - Add "Previous" and "Next" buttons and implement the `handlePageChange` function to dispatch the `searchAnime` action with the correct page number.

### Prompt 9: Implement the Details Page

Fetch and display the full anime details on the `DetailsPage`.
    - Use the `id` from the URL to fetch data from the Jikan API endpoint `/anime/{id}`.
    - Show a detailed skeleton loader while fetching.
    - Display the anime's image, title, score, and synopsis.
    - Handle and display errors gracefully if the anime ID is not found (404) or if another network error occurs.

### Prompt 10: Set Server Port

Configure the Vite dev server to run on port 4000.