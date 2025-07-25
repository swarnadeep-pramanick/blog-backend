const Joi = require('joi');

exports.createCommentSchema = Joi.object({
  postId: Joi.number().required(),
  content: Joi.string().allow('', null),
  media: Joi.array().items(Joi.string()).optional(),
  // media is handled by multer, not validated here
});

exports.updateCommentSchema = Joi.object({
  content: Joi.string().allow('', null),
  media: Joi.array().items(Joi.string()).optional(),
  // media is handled by multer, not validated here
}); 