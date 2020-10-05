import React from 'react';
import { Link } from 'react-router-dom';
import { MovieDetail } from './types';

interface Props {
  movies: MovieDetail[];
}

function MovieList({ movies }: Props): JSX.Element {
  const renderMovie = (movie: MovieDetail): JSX.Element => {
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
