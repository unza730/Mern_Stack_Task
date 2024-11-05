const express = require('express');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.use('/auth', authRoutes);       // Routes for authentication
router.use('/posts', postRoutes);      // Routes for posts
router.use('/posts', commentRoutes);   // Routes for comments on posts

module.exports = router;
