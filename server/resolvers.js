const { PubSub } = require('graphql-subscriptions');
const db = require('./db');
const MovieDB = require('./models/movie');
const ActorDB = require('./models/actor');

const pubSub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const requireAuth = id => {
  if (!id) {
    throw new Error('Unauthorized');
  }
};

const Query = {
  movie: (parent, { id }) => MovieDB.findById(id),
  movies: () => MovieDB.find({}),
  actor: (parent, { id }) => ActorDB.findById(id),
  actors: () => ActorDB.find({}),
  messages: (parent, args, { user }) => {
    requireAuth(user.id);
    return db.messages.list();
  },
};

const Mutation = {
  createMovie: (parent, { input }, { user }) => {
    requireAuth(user.id);
    return MovieDB.create(input);
  },
  addActor: (parent, { input }, { user }) => {
    requireAuth(user.id);
    return ActorDB.create({ ...input, addedBy: user.id });
  },
  addMessage: (parent, { input }, { user }) => {
    requireAuth(user.id);
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
    subscribe: (parent, args, { user }) => {
      requireAuth(user.sub);
      return pubSub.asyncIterator(MESSAGE_ADDED);
    },
  },
};

const Actor = {
  movies: parent => MovieDB.find({ actorId: parent.id }),
};

const Movie = {
  actor: parent => ActorDB.findById(parent.actorId),
};

module.exports = { Query, Mutation, Subscription, Movie, Actor };
