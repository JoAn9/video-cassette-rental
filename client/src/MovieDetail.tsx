import React, { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMovieDetail } from './hooks';
import { ID } from './types';

type ParamsTypes = {
  movieId: ID;
};
function MovieDetail(): ReactElement | null {
  const { movieId } = useParams<ParamsTypes>();
  const { loading, error, movie } = useMovieDetail(movieId);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Some error occurs: {error.message}</h2>;
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
