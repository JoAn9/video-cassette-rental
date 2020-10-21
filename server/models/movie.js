const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: String,
    actorId: String,
    description: String,
  },
  { collection: 'movies' }
);

module.exports = mongoose.model('MovieDB', movieSchema);
