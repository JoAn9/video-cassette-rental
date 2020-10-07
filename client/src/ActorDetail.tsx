import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import { useActorDetail } from './hooks';
import { ID } from './types';

type ParamsTypes = {
  actorId: ID;
};

function ActorDetail(): ReactElement {
  const { actorId } = useParams<ParamsTypes>();

  const { actor, loading, error } = useActorDetail(actorId);

  if (loading) return <h2>Loading</h2>;
  if (error) return <h2>Some error occurs ${error.message}</h2>;
  if (!actor) return <h2>Actor not found</h2>;

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
