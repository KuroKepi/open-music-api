const Joi = require('joi');

const PlaylistsAddPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PlaylistsAddPayloadSchema };
