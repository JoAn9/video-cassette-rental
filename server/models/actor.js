const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const actorSchema = new Schema(
  {
    name: String,
    description: String,
    addedBy: String,
    // movies: { type: Array, default: [] },
    movies: [
      {
        _id: SchemaObjectId,
        title: String,
        description: String,
        actor: { type: Object },
      },
    ],
  },
  { collection: 'actors' }
);

module.exports = mongoose.model('ActorDB', actorSchema);
