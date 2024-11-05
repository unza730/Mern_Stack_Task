const express = require('express');
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', auth, postController.createPost);                  // Create a new post
router.get('/', rateLimit, postController.getAllPosts);             // Get all posts
router.get('/:postId', rateLimit, postController.getPostById);      // Get a single post by ID
router.put('/:postId', auth, postController.updatePost);            // Update a post by ID
router.delete('/:postId', auth, postController.deletePost);         // Delete a post by ID

module.exports = router;
