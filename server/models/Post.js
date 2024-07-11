const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  replies: [replySchema]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
