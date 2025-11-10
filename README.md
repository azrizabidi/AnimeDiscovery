# Anime Search App

A sleek, modern, and responsive web application for searching and exploring anime, built with Vite, React, TypeScript, and Redux. This project demonstrates best practices in modern web development, including state management, API handling, and creating an engaging user experience.

---

## Live Demo

**[Click here to view the live application](https://discoveranime.netlify.app/)** 

## Features

*   **Instant Anime Search**: A highly responsive search bar that fetches results as you type.
*   **Debounced API Calls**: API requests are debounced by 250ms to prevent excessive calls and provide a smooth user experience.
*   **Request Cancellation**: In-flight API requests are automatically cancelled if the user continues typing, preventing race conditions and saving network resources.
*   **Server-Side Pagination**: Navigate through search results with "Previous" and "Next" buttons.
*   **Detailed Views**: Click on any anime in the search results to see a dedicated page with its image, score, and synopsis.
*   **Fully Responsive Design**: A seamless experience across desktop, tablet, and mobile devices.

## Bonus Implementation

This project goes beyond the basic requirements with the following enhancements:

### User Experience

*   **Unique "Wow" Factor**: The search bar smoothly animates from the center of the screen to the top as results are displayed, creating a fluid and intuitive layout transition.
*   **Meaningful Loading States**: Professional skeleton loaders mimic the final content layout, providing a better visual transition while data is being fetched.
*   **Comprehensive UI States**: Clear and helpful messages are displayed for empty states, "no results found", and API errors.
*   **Modern UI/UX**: A polished, dark-themed UI with accent colors and subtle hover effects, inspired by modern media websites.

### Technical Excellence

*   **Robust Error Handling**: The Redux slice gracefully handles various API issues, including network failures, rate limiting (HTTP 429), and malformed responses.
*   **Code Organization**: The project follows a clear and logical folder structure (`pages`, `components`, `store`, `lib`), promoting reusability and maintainability.
*   **TypeScript Best Practices**: Strong typing is used throughout the application with minimal use of `any`, ensuring type safety and better developer experience.

## Tech Stack

*   **Framework**: [React 18](https://react.dev/) (with Hooks)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (conceptually, components are hand-built)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **API**: [Jikan API](https://docs.api.jikan.moe/)

## Setup and Installation

To run this project locally, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   `npm` package manager

### Critical Running Instructions

This project is configured to be run with `npm` only.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/azrizabidi/AnimeDiscovery.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    > **Note:** You MUST use npm. Do not use yarn or pnpm.
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at **`http://localhost:4000`**.
