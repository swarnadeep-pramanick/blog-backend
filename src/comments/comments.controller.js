const commentsService = require('./comments.service');
const { commentDto, commentsDto } = require('./comment.dto');

exports.createComment = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const comment = await commentsService.createComment(req.body, req.user, req.files);
    res.json(commentDto(comment));
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comment = await commentsService.updateComment(req.params.id, req.body, req.user, req.files);
    res.json(commentDto(comment));
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await commentsService.getCommentsByPostId(req.params.postId);
    res.json(commentsDto(comments));
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    await commentsService.deleteComment(req.params.id, req.user);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
}; 