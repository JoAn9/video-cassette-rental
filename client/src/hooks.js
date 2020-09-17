import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/chatRequests';
import { addActorMutation, actorQuery } from './graphql/moviesRequests';

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

// const [messages, setMessages] = useState([]);
// useQuery(messagesQuery, {
//   onCompleted: ({ messages }) => setMessages(messages),
// });
// useSubscription(messageAddedSubscription, {
//   onSubscriptionData: ({ subscriptionData }) => {
//     setMessages([...messages, subscriptionData.data.messageAdded]);
//   },
// });
