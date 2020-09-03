import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';
import gql from 'graphql-tag';
import { isLoggedIn, getAccessToken } from './auth';

const endpointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache(),
});

const movieQuery = gql`
  query MovieQuery($id: ID!) {
    movie(id: $id) {
      id
      title
      actor {
        id
        name
      }
      description
    }
  }
`;

const createMovieMutation = gql`
  mutation CreateMovie($input: CreateMovieInput) {
    movie: createMovie(input: $input) {
      id
      title
      actor {
        id
        name
      }
      description
    }
  }
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
  } = await client.query({ query: actorsQuery });
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
