const endpointURL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
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
