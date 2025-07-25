const commentsRepository = require('./comments.repository');
const prisma = require('../utils/db');

exports.getCommentsByPostId = async (postId) => {
  // Join with User to get author name
  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    include: { post: { include: { author: true } }, author: true },
    orderBy: { createdAt: 'desc' },
  });
  return comments.map(comment => ({
    id: comment.id,
    content: comment.content,
    media: comment.media,
    author: comment.author,
    createdAt: comment.createdAt,
  }));
};

exports.createComment = async (commentData, user, mediaFiles) => {
  const media = (mediaFiles || []).map(file => file.path);
  const data = {
    content: commentData.content,
    media,
    postId: Number(commentData.postId),
    authorId: user.id
  };

  console.log("service data", data);
  return await commentsRepository.createComment(data);
};

exports.updateComment = async (id, commentData, user, mediaFiles) => {
  const media = (mediaFiles || []).map(file => file.path);
  const data = {
    content: commentData.content,
    media,
    authorId: user.id
  };
  if (media.length > 0) data.media = media;
  return await commentsRepository.updateComment(id, data, user.id);
};

exports.deleteComment = async (id, user) => {
  //check if user is the author or post author
  const comment = await commentsRepository.getCommentById(id);
  if (comment.authorId !== user.id && comment.post.authorId !== user.id) {
    throw { status: 401, message: 'Unauthorized' };
  }
  return await commentsRepository.deleteComment(id, user.id);
}; 

exports.getCommentById = async (id) => {
  return await commentsRepository.getCommentById(id);
};

exports.getCommentByPostId = async (postId) => {
  return await commentsRepository.getCommentByPostId(postId);
};