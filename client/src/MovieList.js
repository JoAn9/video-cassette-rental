import React from 'react';
import { Link } from 'react-router-dom';

function MovieList({ movies }) {
  const renderMovie = movie => {
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

  return <ul className="box">{movies.map(movie => renderMovie(movie))}</ul>;
}

export default MovieList;
