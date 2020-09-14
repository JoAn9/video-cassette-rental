import { gql } from '@apollo/client/core';
import client from './client';

const movieDetailFragment = gql`
  fragment MovieQuery on Movie {
    id
    title
    actor {
      id
      name
    }
    description
  }
`;

const movieQuery = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      ...MovieQuery
    }
  }
  ${movieDetailFragment}
`;

const createMovieMutation = gql`
  mutation CreateMovie($input: CreateMovieInput) {
    movie: createMovie(input: $input) {
      ...MovieQuery
    }
  }
  ${movieDetailFragment}
`;

const moviesQuery = gql`
  query MoviesQuery {
    movies {
      id
      title
      actor {
        id
        name
      }
    }
  }
`;

const actorsQuery = gql`
  query ActorsQuery {
    actors {
      id
      name
    }
  }
`;

const actorQuery = gql`
  query ActorQuery($id: ID!) {
    actor(id: $id) {
      id
      name
      description
      movies {
        id
        title
      }
    }
  }
`;

const addActorMutation = gql`
  mutation AddActor($input: AddActorInput) {
    actor: addActor(input: $input) {
      id
      name
      description
      movies {
        id
        title
      }
    }
  }
`;

export async function loadMovie(id) {
  const {
    data: { movie },
  } = await client.query({ query: movieQuery, variables: { id } });
  return movie;
}

export async function createMovie(input) {
  const {
    data: { movie },
  } = await client.mutate({
    mutation: createMovieMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: movieQuery,
        variables: { id: data.movie.id },
        data,
      });
    },
  });
  return movie;
}

export async function loadMovies() {
  const {
    data: { movies },
  } = await client.query({ query: moviesQuery, fetchPolicy: 'no-cache' });
  return movies;
}

export async function loadActorDetail(id) {
  const {
    data: { actor },
  } = await client.query({ query: actorQuery, variables: { id } });
  return actor;
}

export async function loadActors() {
  const {
    data: { actors },
  } = await client.query({ query: actorsQuery, fetchPolicy: 'no-cache' });
  return actors;
}

export async function addActor(input) {
  const {
    data: { actor },
  } = await client.mutate({
    mutation: addActorMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: actorQuery,
        variables: { id: data.actor.id },
        data,
      });
    },
  });
  return actor;
}
