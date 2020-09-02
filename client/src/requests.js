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

export async function loadMovie(id) {
  const query = gql`
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
  const {
    data: { movie },
  } = await client.query({ query, variables: { id } });
  return movie;
}

export async function loadMovies() {
  const query = gql`
    {
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
  const {
    data: { movies },
  } = await client.query({ query, fetchPolicy: 'no-cache' });
  return movies;
}

export async function loadActorDetail(id) {
  const query = gql`
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
  const {
    data: { actor },
  } = await client.query({ query, variables: { id } });
  return actor;
}

export async function loadActors() {
  const query = gql`
    {
      actors {
        id
        name
      }
    }
  `;
  const {
    data: { actors },
  } = await client.query({ query, fetchPolicy: 'no-cache' });
  return actors;
}

export async function createMovie(input) {
  const mutation = gql`
    mutation CreateMovie($input: CreateMovieInput) {
      movie: createMovie(input: $input) {
        id
        title
        actor {
          id
          name
        }
      }
    }
  `;
  const {
    data: { movie },
  } = await client.mutate({ mutation, variables: { input } });
  return movie;
}

export async function addActor(input) {
  const mutation = gql`
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
  const {
    data: { actor },
  } = await client.mutate({ mutation, variables: { input } });
  return actor;
}
