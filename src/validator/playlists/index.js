const InvariantError = require('../../exception/InvariantError');
const { PlaylistsAddPayloadSchema } = require('./schema');

const PlaylistsValidator = {
  validatePostPlaylistsPayload: (payload) => {
    const { error } = PlaylistsAddPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = PlaylistsValidator;
