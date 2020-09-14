import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAccessToken } from '../utils/auth';

const endpointURL = 'http://localhost:8000/graphql';
const wsUrl = 'ws://localhost:8000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  const token = getAccessToken();
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

const httpLink = ApolloLink.from([
  authLink,
  new HttpLink({ uri: endpointURL }),
]);

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    connectionParams: () => ({
      accessToken: getAccessToken(),
    }),
    lazy: true,
    reconnect: true,
  },
});

const isSubscription = operation => {
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

const client = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache: new InMemoryCache(),
  // defaultOptions: { query: { fetchPolicy: 'no-cache' } },
});

export default client;
