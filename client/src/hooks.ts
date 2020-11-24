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
  searchMoviesQuery,
} from './graphql/moviesRequests';
import {
  ID,
  Actor,
  ActorData,
  ActorVars,
  ActorsData,
  ActorInput,
  MovieDetail,
  MovieDetailData,
  MovieDetailVars,
  MoviesData,
} from './types';

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
    addMessage: (text: string) =>
      addMessage({ variables: { input: { text } } }),
  };
}

export function useActorDetail(id: ID) {
  const { loading, error, data } = useQuery<ActorData, ActorVars>(actorQuery, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });
  const actor = data && data.actor;
  return { actor, loading, error };
}

export function useAddActor() {
  const [addActor] = useMutation<{ actor: Actor }, { input: ActorInput }>(
    addActorMutation,
    {
      update: (cache, { data }) => {
        if (!data || !data.actor) {
          return;
        }
        cache.writeQuery({
          query: actorQuery,
          variables: { id: data.actor.id },
          data,
        });
      },
    }
  );
  return {
    addActor: ({ name, description }: { name: string; description: string }) =>
      addActor({ variables: { input: { name, description } } }),
  };
}

export function useMovieForm() {
  const { loading: loadingActors, error: errorActors, data } = useQuery<
    ActorsData
  >(actorsQuery, {
    fetchPolicy: 'no-cache',
  });
  const actors = data ? data.actors : [];

  const [
    createMovie,
    { loading: loadingCreate, error: errorCreate },
  ] = useMutation<{ movie: MovieDetail }>(createMovieMutation, {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: movieQuery,
        variables: { id: data && data.movie && data.movie.id },
        data,
      });
    },
  });
  return {
    actors,
    loadingActors,
    errorActors,
    createMovie: ({
      actorId,
      title,
      description,
    }: {
      actorId: ID;
      title: string;
      description: string;
    }) =>
      createMovie({ variables: { input: { actorId, title, description } } }),
    loadingCreate,
    errorCreate,
  };
}

export function useMovieBoard() {
  const { loading, error, data } = useQuery<MoviesData>(moviesQuery, {
    fetchPolicy: 'no-cache',
  });
  const movies = data ? data.movies : [];
  return { movies, loading, error };
}

export function useMovieDetail(id: ID) {
  const { loading, error, data } = useQuery<MovieDetailData, MovieDetailVars>(
    movieQuery,
    {
      variables: { id },
    }
  );
  const movie = data && data.movie;

  return { movie, loading, error };
}

export function useSearchMovies(text: string) {
  const { loading, error, data } = useQuery(
    searchMoviesQuery,
    {
      variables: { text },
      fetchPolicy: 'no-cache',
    }
  );
  const movies = data && data.searchMovies;
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

// <Mutation
//   mutation={POST_MUTATION}
//   variables={{ description, url }}
//   onCompleted={() => this.props.history.push('/')}
// >
//   {postMutation => <button onClick={postMutation}>Submit</button>}
// </Mutation>;
