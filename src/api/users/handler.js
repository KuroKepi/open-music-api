const NotFoundError = require('../../exception/NotFoundError');

class UsersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postUsersHandler = this.postUsersHandler.bind(this);
    this.getUsersByIdHandler = this.getUsersByIdHandler.bind(this);
  }

  async postUsersHandler(req, h) {
    try {
      this.validator.validatePostUsersPayload(req.payload);
      const { username, password, fullname } = req.payload;
      const userId = await this.service.addUsers({ username, password, fullname });
      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }

  async getUsersByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);
      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(404);
      }
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }
}

module.exports = UsersHandler;
