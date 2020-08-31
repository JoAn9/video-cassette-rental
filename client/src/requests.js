import { isLoggedIn, getAccessToken } from './auth';

const endpointURL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
  const request = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  };
  if (isLoggedIn()) {
    request.headers['authorization'] = `Bearer ${getAccessToken()}`;
  }
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();

  if (responseBody.errors) {
    const message = responseBody.errors.map(err => err.message).join('\n');
    throw new Error(message);
  }

  return responseBody.data;
}

export async function loadMovie(id) {
  const query = `query MovieQuery($id: ID!) {
    movie(id: $id) {
      id
      title
      actor {
        id
        name
      }
      description
    }
  }`;
  const { movie } = await graphqlRequest(query, { id });
  return movie;
}

export async function loadMovies() {
  const query = `{
    movies {
      id
      title
      actor {
        id
        name
      }
    }
  }`;
  const { movies } = await graphqlRequest(query);
  return movies;
}

export async function loadActorDetail(id) {
  const query = `query ActorQuery($id: ID!) {
    actor(id: $id) {
      id
      name
      description
      movies {
        id
        title
      }
    }
  }`;
  const { actor } = await graphqlRequest(query, { id });
  return actor;
}

export async function loadActors() {
  const query = `{
    actors {
      id name
    }
  }`;
  const { actors } = await graphqlRequest(query);
  return actors;
}

export async function createMovie(input) {
  const mutation = `
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
  const { movie } = await graphqlRequest(mutation, { input });
  return movie;
}

export async function addActor(input) {
  const mutation = `mutation AddActor($input: AddActorInput) {
    actor: addActor(input: $input) {
      id
      name
      description
      movies {
        id
        title
      }
    }
  }`;
  const { actor } = await graphqlRequest(mutation, { input });
  return actor;
}
