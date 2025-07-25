const postsService = require('./posts.service');
const { postDto, postsDto } = require('./post.dto');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts(req.query);
    res.json(postsDto(posts));
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    res.json(postDto(post));
  } catch (err) {
    next(err);
  }
};

exports.getPostByAuthorId = async (req, res, next) => {
  try {
    const posts = await postsService.getPostByAuthorId(req.params.authorId);
    res.json(postsDto(posts));
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    // req.files is now an array of all uploaded media files
    const post = await postsService.createPost(req.body, req.user, req.files);
    res.json(postDto(post));
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    // Pass req.files to the service
    console.log(req.files);
    const post = await postsService.updatePost(req.params.id, req.body, req.user, req.files);
    res.json(postDto(post));
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await postsService.deletePost(req.params.id, req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 