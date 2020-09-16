import React from 'react';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import { useActorDetail } from './hooks';

function ActorDetail() {
  const { actorId } = useParams();
  const { actor, loading, error } = useActorDetail(actorId);

  if (loading) return 'Loading';
  if (error) return `Some error occurs ${error.message}`;
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
