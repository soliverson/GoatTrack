const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const post = new Post({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Reply to a post
exports.replyToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.replies.push({
      author: req.body.author,
      content: req.body.content
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
