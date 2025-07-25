const Joi = require('joi');

exports.createPostSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  media: Joi.array().items(Joi.string()).optional(),
});

exports.updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  content: Joi.string().min(1).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  media: Joi.array().items(Joi.string()).optional(),
}); 