const express = require('express');
const auth = require('../middleware/auth');
const rateLimit = require('../middleware/rateLimit');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/:postId/comments', auth, commentController.addComment);            // Add a comment to a post
router.get('/:postId/comments', rateLimit, commentController.getComments);       // Get all comments for a post
router.put('/:postId/comments/:commentId', auth, commentController.updateComment); // Update a comment by ID
router.delete('/:postId/comments/:commentId', auth, commentController.deleteComment); // Delete a comment by ID

module.exports = router;
