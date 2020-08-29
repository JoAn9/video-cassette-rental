const db = require('./db');

const Query = {
  movie: (parent, { id }) => db.movies.get(id),
  movies: () => db.movies.list(),
  actor: (parent, { id }) => db.actors.get(id),
  actors: () => db.actors.list(),
};

const Mutation = {
  createMovie: (parent, { input }, { user }) => {
    if (!user) {
      throw new Error('Unauthorized!!! Alarm Alarm!!!');
    }
    const id = db.movies.create(input);
    return db.movies.get(id);
  },
  addActor: (parent, { input }) => {
    const id = db.actors.create(input);
    return db.actors.get(id);
  },
};

const Actor = {
  movies: actor => db.movies.list().filter(movie => movie.actorId === actor.id),
};

const Movie = {
  actor: parent => db.actors.get(parent.actorId),
};

module.exports = { Query, Mutation, Movie, Actor };
