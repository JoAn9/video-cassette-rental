const { PubSub } = require('graphql-subscriptions');
const db = require('./db');

const pubSub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const requireAuth = id => {
  if (!id) {
    throw new Error('Unauthorized');
  }
};

const Query = {
  movie: (parent, { id }) => db.movies.get(id),
  movies: () => db.movies.list(),
  actor: (parent, { id }) => db.actors.get(id),
  actors: () => db.actors.list(),
  messages: (parent, args, { userId }) => {
    requireAuth(userId);
    return db.messages.list();
  },
};

const Mutation = {
  createMovie: (parent, { input }, { userId }) => {
    requireAuth(userId);
    const id = db.movies.create(input);
    return db.movies.get(id);
  },
  addActor: (parent, { input }, { userId }) => {
    requireAuth(userId);
    const id = db.actors.create({ ...input, addedBy: userId });
    return db.actors.get(id);
  },
  addMessage: (parent, { input }, { userId, user }) => {
    requireAuth(userId);
    const messageId = db.messages.create({
      from: user.name,
      text: input.text,
    });
    const message = db.messages.get(messageId);
    pubSub.publish(MESSAGE_ADDED, { messageAdded: message });
    return message;
  },
};

const Subscription = {
  messageAdded: {
    subscribe: () => pubSub.asyncIterator(MESSAGE_ADDED),
  },
};

const Actor = {
  movies: actor => db.movies.list().filter(movie => movie.actorId === actor.id),
};

const Movie = {
  actor: parent => db.actors.get(parent.actorId),
};

module.exports = { Query, Mutation, Subscription, Movie, Actor };
