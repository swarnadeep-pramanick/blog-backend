const prisma = require('../utils/db');

exports.createComment = async (data) => {
  return await prisma.comment.create({
    data,
    include: { author: true }
  });
};

exports.updateComment = async (id, data, userId) => {
  // Optionally, check if user is the author
  return await prisma.comment.update({
    where: { id: Number(id), authorId: userId },
    data,
    include: { author: true }
  });
};

exports.getCommentsByPostId = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId: Number(postId) },
    include: { author: true }
  });
};

exports.deleteComment = async (id, userId) => {
  return await prisma.comment.delete({
    where: { id: Number(id), authorId: userId }
  });
}; 

exports.getCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: { id: Number(id) },
    include: { author: true }
  });
};

exports.getCommentByPostId = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId: Number(postId) },
    include: { author: true }
  });
};