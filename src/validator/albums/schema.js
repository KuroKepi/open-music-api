const Joi = require('joi');

const AlbumIdPayloadSchema = Joi.object({
  id: Joi.string().required(),
});
const AlbumsUpdatePayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().max(9999).required(),
});
const AlbumsDeletedPayloadSchema = Joi.object({
  id: Joi.string().required(),
});
const AlbumsAddPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().max(9999).required(),
});
module.exports = {
  AlbumIdPayloadSchema,
  AlbumsUpdatePayloadSchema,
  AlbumsDeletedPayloadSchema,
  AlbumsAddPayloadSchema,
};
