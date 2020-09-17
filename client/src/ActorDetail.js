import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import { actorQuery } from './graphql/moviesRequests';

function ActorDetail() {
  const { actorId } = useParams();

  const { loading, error, data } = useQuery(actorQuery, {
    variables: { id: actorId },
  });

  if (loading) return 'Loading';
  if (error) return `Some error occurs ${error.message}`;

  const { actor } = data;
  if (!actor) return 'Actor not found';
  const { name, description, movies } = actor;

  return (
    <div>
      <h1 className="title">{name}</h1>
      <div className="box">{description}</div>
      <h5 className="title is-5">{name}'s movies</h5>
      <MovieList movies={movies} />
    </div>
  );
}

export default ActorDetail;
