const express = require('express');
const router = express.Router();
const commentsController = require('./comments.controller');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createCommentSchema, updateCommentSchema } = require('./comments.validation');

router.post(
  '/',
  authMiddleware,
  upload.array('media', 3),
  validateRequest(createCommentSchema),
  commentsController.createComment
);

router.put(
  '/:id',
  authMiddleware,
  upload.array('media', 3),
  validateRequest(updateCommentSchema),
  commentsController.updateComment
);

router.get('/getCommentsByPostId/:postId', commentsController.getCommentsByPostId);

router.delete('/:id', authMiddleware, commentsController.deleteComment);

module.exports = router; 