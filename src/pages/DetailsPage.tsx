import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Anime } from '@/store/animeSlice'; // Re-using the Anime type

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const abortController = new AbortController();
    const { signal } = abortController;

    setIsLoading(true);
    setError(null);

    fetch(`https://api.jikan.moe/v4/anime/${id}`, { signal })
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`No anime found with the ID "${id}". It may have been removed or the ID is incorrect.`);
          } else {
            throw new Error(`An unexpected error occurred. (Status: ${res.status})`);
          }
        }
        return res.json();
      })
      .then(data => {
        setAnime(data.data);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/3 h-96 rounded-lg" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">An Error Occurred</h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Link to="/" className="text-primary hover:underline">← Go back to Search</Link>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-muted-foreground">Could not find the requested anime. It might not exist.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">← Go back to Search</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Link to="/" className="text-primary hover:underline">← Back to Search</Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <motion.img
          layoutId={`anime-poster-${anime.mal_id}`} // For potential shared layout animations
          src={anime.images.webp.image_url}
          alt={`Poster for ${anime.title}`}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-2xl"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{anime.title}</h1>
          {anime.score && <p className="text-muted-foreground text-lg mb-4">Score: <span className="font-bold text-primary">{anime.score}</span></p>}
          <p className="leading-relaxed">{anime.synopsis || "No synopsis available."}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsPage;