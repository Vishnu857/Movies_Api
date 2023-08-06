const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  imdbId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  backdrops: {
    type: [String],
    required: true,
  },
  reviewIds: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

const movies = mongoose.model("movies", movieSchema);
module.exports = movies;
