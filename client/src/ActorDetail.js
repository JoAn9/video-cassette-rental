import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from './MovieList';
import { loadActorDetail } from './graphql/moviesRequests';

function ActorDetail() {
  const [actor, setActor] = useState(null);

  const { actorId } = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await loadActorDetail(actorId);
      setActor(response);
    }
    fetchData();
  }, []);

  if (!actor) return null;

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
