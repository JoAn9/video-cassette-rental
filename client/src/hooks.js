import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/chatRequests';

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

// const [messages, setMessages] = useState([]);
// useQuery(messagesQuery, {
//   onCompleted: ({ messages }) => setMessages(messages),
// });
// useSubscription(messageAddedSubscription, {
//   onSubscriptionData: ({ subscriptionData }) => {
//     setMessages([...messages, subscriptionData.data.messageAdded]);
//   },
// });

// const { loading, error, data } = useQuery(messagesQuery, {fetchPolicy: 'no-cache', variables: {}});
