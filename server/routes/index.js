const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/forum/posts', forumController.getPosts);
router.post('/forum/posts', forumController.createPost);
router.post('/forum/posts/:postId/replies', forumController.replyToPost);

module.exports = router;
