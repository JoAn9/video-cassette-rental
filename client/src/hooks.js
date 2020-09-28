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
  const { loading: loadingActors, error: errorActors, data } = useQuery(
    actorsQuery,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const actors = data ? data.actors : [];
  const [
    createMovie,
    { loading: loadingCreate, error: errorCreate, data: dataCreate },
  ] = useMutation(createMovieMutation, {
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
    loadingActors,
    errorActors,
    createMovie: ({ actorId, title, description }) =>
      createMovie({ variables: { input: { actorId, title, description } } }),
    loadingCreate,
    errorCreate,
  };
}

export function useMovieBoard() {
  const { loading, error, data } = useQuery(moviesQuery, {
    fetchPolicy: 'no-cache',
  });
  const movies = data ? data.movies : [];
  return { movies, loading, error };
}

export function useMovieDetail(id) {
  const { loading, error, data } = useQuery(movieQuery, { variables: { id } });
  const movie = data ? data.movie : {};

  return { movie, loading, error };
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

// <Mutation
//   mutation={POST_MUTATION}
//   variables={{ description, url }}
//   onCompleted={() => this.props.history.push('/')}
// >
//   {postMutation => <button onClick={postMutation}>Submit</button>}
// </Mutation>;
