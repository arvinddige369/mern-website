const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String // Optional field for the image URL or base64 string
});

module.exports = mongoose.model('Post', postSchema);