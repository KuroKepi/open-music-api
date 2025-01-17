const InvariantError = require('../../exception/InvariantError');
const {
  AlbumIdPayloadSchema,
  AlbumsUpdatePayloadSchema,
  AlbumsDeletedPayloadSchema,
  AlbumsAddPayloadSchema,
} = require('./schema');

const AlbumsValidator = {
  validatePostAlbumsPayload: (payload) => {
    const { error } = AlbumsAddPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validatePutAlbumsPayload: (payload) => {
    const { error } = AlbumsUpdatePayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateGetAlbumsIdPayload: (payload) => {
    const { error } = AlbumIdPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateAlbumsDeletedPayload: (payload) => {
    const { error } = AlbumsDeletedPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

};

module.exports = AlbumsValidator;
