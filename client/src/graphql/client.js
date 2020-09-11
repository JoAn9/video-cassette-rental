import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
  gql,
} from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isLoggedIn, getAccessToken } from '../auth';

const endpointURL = 'http://localhost:8000/graphql';
const wsUrl = 'ws://localhost:8000/graphql';

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

const httpLink = ApolloLink.from([
  authLink,
  new HttpLink({ uri: endpointURL }),
]);

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
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
});

export default client;
