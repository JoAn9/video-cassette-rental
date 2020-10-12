import React, { ReactElement } from 'react';
import MovieList from './MovieList';
import { useMovieBoard } from './hooks';

function MovieBoard(): ReactElement {
  const { movies, loading, error } = useMovieBoard();

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Some error occurs: {error.message}</h2>;

  return (
    <div>
      <h1 className="title">Movie Board</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default MovieBoard;
