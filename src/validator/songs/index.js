const InvariantError = require('../../exception/InvariantError');
const {
  SongsIdPayloadSchema,
  SongsUpdatePayloadSchema,
  SongsDeletePayloadSchema,
  SongsAddPayloadSchema,
} = require('./schema');

const SongsValidator = {
  validatePostSongsPayload: (payload) => {
    const { error } = SongsAddPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateGetSongsIdPayload: (payload) => {
    const { error } = SongsIdPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validatePutSongsPayload: (payload) => {
    const { error } = SongsUpdatePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateDeleteSongsIdPayload: (payload) => {
    const { error } = SongsDeletePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};
module.exports = SongsValidator;
