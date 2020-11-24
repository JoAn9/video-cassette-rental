import React, { ReactElement, useState } from 'react';
import MovieList from './MovieList';
import SearchMovie from './SearchMovie';
import { useSearchMovies } from './hooks';

function MovieBoard(): ReactElement {
  const [searchText, setSearchText] = useState('');
  const { loading, error, movies } = useSearchMovies(searchText);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Some error occurs: {error.message}</h2>;

  const handleSearch = (
    text: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSearchText(text);
  };

  return (
    <div>
      <div className="titleHeading">
        <h1 className="title">Movie Board</h1>
        <SearchMovie handleSearch={handleSearch} />
      </div>
      <MovieList movies={movies} />
    </div>
  );
}

export default MovieBoard;
