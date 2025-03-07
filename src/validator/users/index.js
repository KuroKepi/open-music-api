const InvariantError = require('../../exception/InvariantError');
const { UsersIdPayloadSchema, UsersAddPayloadSchema } = require('./schema');

const UsersValidator = {
  validatePostUsersPayload: (payload) => {
    const { error } = UsersAddPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
  validateGetUsersIdPayload: (payload) => {
    const { error } = UsersIdPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = UsersValidator;
