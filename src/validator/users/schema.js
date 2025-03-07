const Joi = require('joi');

const UsersIdPayloadSchema = Joi.object({
  id: Joi.string().required(),
});

const UsersAddPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = { UsersIdPayloadSchema, UsersAddPayloadSchema };
