const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  author: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
