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

export const movieQuery = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      ...MovieQuery
    }
  }
  ${movieDetailFragment}
`;

export const createMovieMutation = gql`
  mutation CreateMovie($input: CreateMovieInput) {
    movie: createMovie(input: $input) {
      ...MovieQuery
    }
  }
  ${movieDetailFragment}
`;

export const moviesQuery = gql`
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

export const actorsQuery = gql`
  query ActorsQuery {
    actors {
      id
      name
    }
  }
`;

export const actorQuery = gql`
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

export const addActorMutation = gql`
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

// export async function loadMovies() {
//   const {
//     data: { movies },
//   } = await client.query({ query: moviesQuery, fetchPolicy: 'no-cache' });
//   return movies;
// }
