const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now },
  replies: [{
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
  }]
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});
