import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/chatRequests';
import {
  addActorMutation,
  actorQuery,
  actorsQuery,
  createMovieMutation,
  movieQuery,
  moviesQuery,
} from './graphql/moviesRequests';

export function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeQuery({
        query: messagesQuery,
        data: {
          messages: [...messages, subscriptionData.data.messageAdded],
        },
      });
    },
  });
  const [addMessage] = useMutation(addMessageMutation);

  return {
    messages,
    addMessage: text => addMessage({ variables: { input: { text } } }),
  };
}

export function useActorDetail(id) {
  const { loading, error, data } = useQuery(actorQuery, { variables: { id } });
  const actor = data ? data.actor : {};
  return { actor, loading, error };
}

export function useAddActor() {
  const [addActor] = useMutation(addActorMutation, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: actorQuery,
        variables: { id: data.actor.id },
        data,
      });
    },
  });
  return {
    addActor: ({ name, description }) =>
      addActor({ variables: { input: { name, description } } }),
  };
}

export function useMovieForm() {
  const { loading, error, data } = useQuery(actorsQuery, {
    fetchPolicy: 'no-cache',
  });
  const actors = data ? data.actors : [];
  const [createMovie] = useMutation(createMovieMutation, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: movieQuery,
        variables: { id: data.movie.id },
        data,
      });
    },
  });
  return {
    actors,
    loading,
    error,
    createMovie: ({ actorId, title, description }) =>
      createMovie({ variables: { input: { actorId, title, description } } }),
  };
}

export function useMovieBoard() {
  const { loading, error, data } = useQuery(moviesQuery, {
    fetchPolicy: 'no-cache',
  });
  const movies = data ? data.movies : [];
  return { movies, loading, error };
}

// const [messages, setMessages] = useState([]);
// useQuery(messagesQuery, {
//   onCompleted: ({ messages }) => setMessages(messages),
// });
// useSubscription(messageAddedSubscription, {
//   onSubscriptionData: ({ subscriptionData }) => {
//     setMessages([...messages, subscriptionData.data.messageAdded]);
//   },
// });
