import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import { loadMovies } from './graphql/requests';

function MovieBoard() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await loadMovies();
      setMovies(response);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="title">Movie Board</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default MovieBoard;
