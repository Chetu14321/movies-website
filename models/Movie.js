const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  videoUrl: { type: String, required: true },  // S3 public URL
  thumbnailUrl: String,
  duration: Number,
  rating: Number,
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
