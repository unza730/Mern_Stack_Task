const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, userId: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'username');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!comment) return res.status(404).json({ message: 'Comment not found or not authorized' });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.commentId, userId: req.user.id });
    if (!comment) return res.status(404).json({ message: 'Comment not found or not authorized' });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
