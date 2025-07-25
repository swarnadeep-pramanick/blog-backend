const express = require('express');
const router = express.Router();
const postsController = require('./posts.controller');
const authMiddleware = require('../middleware/authMiddleware');
const commentsRouter = require('../comments/comments.route');
const validateRequest = require('../middleware/validateRequest');
const { createPostSchema, updatePostSchema } = require('./posts.validation');
const upload = require('../middleware/uploadMiddleware');

router.get('/', postsController.getAllPosts);
router.get('/postById/:id', postsController.getPostById);
router.get('/postByAuthorId/:authorId', postsController.getPostByAuthorId);
router.post(
  '/',
  authMiddleware,
  upload.array('media', 7),
  postsController.createPost
);
router.put(
  '/:id',
  authMiddleware,
  upload.array('media', 7),
  validateRequest(updatePostSchema),
  postsController.updatePost
);
router.delete('/:id', authMiddleware, postsController.deletePost);

router.use('/comments', commentsRouter);

module.exports = router; 