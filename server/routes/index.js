const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController'); // Update with your actual controller path

router.get('/forum/posts', forumController.getPosts); // Update with your actual function
router.post('/forum/posts', forumController.createPost); // Update with your actual function
router.post('/forum/posts/:postId/replies', forumController.replyToPost); // Update with your actual function

module.exports = router;
