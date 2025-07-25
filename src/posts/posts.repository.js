const prisma = require('../utils/db');

exports.findAllPosts = async ({ limit = 10, offset = 0, filters = {} } = {}) => {
  return await prisma.post.findMany({
    where: filters,
    include: { author: true },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  });
};

exports.getPostById = async (id) => {
  return await prisma.post.findUnique({ where: { id: Number(id) }, include: { author: true } });
};

exports.getPostByAuthorId = async (authorId) => {
  return await prisma.post.findMany({ where: { authorId: Number(authorId) }, include: { author: true } });
};

exports.createPost = async (postData) => {
  return await prisma.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      images: postData.images,
      videos: postData.videos,
      authorId: postData.authorId
    },
    include: {
      author: true
    }
  });
};

exports.updatePost = async (postId, updateData, userId) => {
  // Optionally, check if the user is the author before updating
  return await prisma.post.update({
    where: { id: Number(postId), authorId: userId },
    data: updateData,
    include: { author: true }
  });
};

exports.deletePost = async (id) => {
  return await prisma.post.delete({ where: { id: Number(id) } });
}; 