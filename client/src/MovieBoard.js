import React from 'react';
import MovieList from './MovieList';
import { useMovieBoard } from './hooks';

function MovieBoard() {
  const { movies, loading, error } = useMovieBoard();

  if (loading) return 'Loading...';
  if (error) return `Some error occurs: ${error.message}`;

  return (
    <div>
      <h1 className="title">Movie Board</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default MovieBoard;
