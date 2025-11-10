import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AnimeSearchInput from '@/components/AnimeSearchInput';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { searchAnime } from '@/store/animeSlice';

const MainSearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading, error, noResults, currentPage, totalPages, currentQuery } = useSelector((state: RootState) => state.anime);
  const isLoading = loading === 'pending';
  const hasSearched = currentQuery !== '';

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      // We need to create a new AbortController for this new request
      const abortController = new AbortController();
      dispatch(searchAnime({ query: currentQuery, page: newPage }, { signal: abortController.signal }));
    }
  };

  return (
    <div
      className={`container mx-auto p-4 md:p-8 flex flex-col min-h-[calc(100vh-8rem)] ${
        hasSearched ? 'justify-start' : 'justify-center'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 260, damping: 30, duration: 0.5 }}
        className="w-full"
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Anime Discovery
          </h1>
          <p className="text-muted-foreground text-center mb-8">Find your next favorite show.</p>
          <AnimeSearchInput />
        </motion.div>
      </motion.div>

      <div className="mt-12">
        {isLoading && (
          <>
            <p className="text-center text-muted-foreground mb-4">Searching for anime...</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {/* Skeleton for image cards */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center text-destructive bg-destructive/10 p-4 rounded-md">
            <p className="font-bold">An error occurred:</p>
            <p>{error}</p>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && noResults && (
          <div className="text-center text-muted-foreground">
            <p>No results found for "{currentQuery}". Try a different search term.</p>
          </div>
        )}

        {/* Results and Pagination */}
        {!isLoading && results.length > 0 && (
          <>
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {results.map((anime, index) => (
                <motion.div key={anime.mal_id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                  <Link to={`/anime/${anime.mal_id}`} className="group block rounded-lg bg-card/50 backdrop-blur-sm border hover:border-primary transition-all overflow-hidden">
                    <img src={anime.images.webp.image_url} alt={anime.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="p-3">
                      <h3 className="font-semibold text-card-foreground truncate" title={anime.title}>{anime.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={!totalPages || currentPage >= totalPages}>Next</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainSearchPage;