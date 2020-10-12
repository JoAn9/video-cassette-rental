import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { MovieDetail } from './types';

type MoviesProps = {
  movies: MovieDetail[];
};

function MovieList({ movies }: MoviesProps): ReactElement {
  const renderMovie = (movie: MovieDetail): ReactElement => {
    const title = movie.actor
      ? `${movie.title} with ${movie.actor.name}`
      : movie.title;
    return (
      <li className="media" key={movie.id}>
        <div className="media-content">
          <Link to={`/movies/${movie.id}`}>{title}</Link>
        </div>
      </li>
    );
  };

  return (
    <ul className="box">
      {movies?.map((movie: MovieDetail) => renderMovie(movie))}
    </ul>
  );
}

export default MovieList;
