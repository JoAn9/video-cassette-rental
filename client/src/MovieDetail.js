import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadMovie } from './requests';

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await loadMovie(movieId);
      setMovie(response);
    }
    fetchData();
  }, []);

  if (!movie) return null;

  const { title, description, actor } = movie;

  return (
    <div>
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">
        <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
      </h2>
      <div className="box">{description}</div>
    </div>
  );
}

export default MovieDetail;
