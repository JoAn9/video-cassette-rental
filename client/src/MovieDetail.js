import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieDetail } from './hooks';

function MovieDetail() {
  const { movieId } = useParams();
  const { loading, error, movie } = useMovieDetail(movieId);

  if (loading) return 'Loading...';
  if (error) return `Some error occurs: ${error.message}`;
  if (!movie) return null;

  const { title, description, actor } = movie;
  return (
    <div data-test="movie-component">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">
        <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
      </h2>
      <div className="box">{description}</div>
    </div>
  );
}

export default MovieDetail;
