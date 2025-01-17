const Joi = require('joi');

const SongsIdPayloadSchema = Joi.object({
  id: Joi.string().required(),
});
const SongsUpdatePayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().max(9999).required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().required(),
});
const SongsDeletePayloadSchema = Joi.object({
  id: Joi.string().required(),
});
const SongsAddPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().max(9999).required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number().required(),
  albumId: Joi.string(),
});
module.exports = {
  SongsIdPayloadSchema,
  SongsUpdatePayloadSchema,
  SongsDeletePayloadSchema,
  SongsAddPayloadSchema,
};
