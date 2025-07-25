const postsRepository = require('./posts.repository');
const redisClient = require('../services/redisClient');
const { postDto } = require('./post.dto');

exports.getAllPosts = async (query = {}) => {
  const { limit = 10, offset = 0, author, title } = query;
  const cacheKey = `posts:list:${limit}:${offset}:${author || ''}:${title || ''}`;
  // Try cache first
  const cached = await redisClient.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const filters = {};
  if (author) filters.author = { name: { contains: author, mode: 'insensitive' } };
  if (title) filters.title = { contains: title, mode: 'insensitive' };

  const posts = await postsRepository.findAllPosts({
    limit: Number(limit),
    offset: Number(offset),
    filters,
  });
  // Map to include excerpt and author name
  const result = posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.content.slice(0, 100),
    content: post.content,
    author: post.author,
    createdAt: post.createdAt,
  }));
  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 }); // Cache for 60s
  return result;
};

exports.createPost = async (postData, user, mediaFiles) => {
  // Separate images and videos based on mimetype
  const images = [];
  const videos = [];
  (mediaFiles || []).forEach(file => {
    if (file.mimetype.startsWith('image/')) {
      images.push(file.path);
    } else if (file.mimetype.startsWith('video/')) {
      videos.push(file.path);
    }
  });

  const newPostData = {
    ...postData,
    images,
    videos,
    authorId: user.id // instead of userId
  };

  const post = await postsRepository.createPost(newPostData);
  return post;
};

exports.getPostById = async (id) => {
  const post = await postsRepository.getPostById(id);
  return post;
};

exports.getPostByAuthorId = async (authorId) => {
  const posts = await postsRepository.getPostByAuthorId(authorId);
  return posts;
};

exports.updatePost = async (postId, postData, user, mediaFiles) => {
  // Separate images and videos based on mimetype
  const images = [];
  const videos = [];
  (mediaFiles || []).forEach(file => {
    if (file.mimetype.startsWith('image/')) {
      images.push(file.path);
    } else if (file.mimetype.startsWith('video/')) {
      videos.push(file.path);
    }
  });

  // Prepare update data
  const updateData = {
    ...postData,
  };

  // Only update media if new files are uploaded
  if (images.length > 0) updateData.images = images;
  if (videos.length > 0) updateData.videos = videos;

  // Optionally, you may want to merge with existing images/videos instead of replacing

  // Update post (ensure only the author can update)
  const post = await postsRepository.updatePost(postId, updateData, user.id);
  return post;
};

exports.deletePost = async (id, user) => {
  const post = await postsRepository.getPostById(id);
  if(user.id !== post.authorId) {
    throw { status: 401, message: 'Unauthorized' };
  }
  await postsRepository.deletePost(id);
  return { message: 'Post deleted' };
}; 