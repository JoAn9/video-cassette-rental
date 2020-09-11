const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  users: store.collection('users'),
  actors: store.collection('actors'),
  movies: store.collection('movies'),
  messages: store.collection('messages'),
};
