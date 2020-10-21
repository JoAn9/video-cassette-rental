const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const actorSchema = new Schema(
  {
    name: String,
    description: String,
    addedBy: String,
    movies: [
      {
        _id: SchemaObjectId,
        title: String,
        description: String,
        actor: {},
      },
    ],
  },
  { collection: 'actors' }
);

module.exports = mongoose.model('ActorDB', actorSchema);

// to-fix
// 1. actor _id
// 2. mongoose connection (password, process.dot.env)
