const NotFoundError = require('../../exception/NotFoundError');

class AuthenticationHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationByIdHandler = this.putAuthenticationByIdHandler.bind(this);
    this.deleteAuthenticationByIdHandler = this.deleteAuthenticationByIdHandler.bind(this);
  }

  async postAuthenticationHandler(req, h) {
    try {
      this.validator.validatePostAuthenticationPayload(req.payload);
      const { username, password } = req.payload;
      const accessToken = await this.service.addAuthentication({ username, password });
      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
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

  async putAuthenticationByIdHandler(req, h) {
    try {
      this.validator.validatePutAuthenticationPayload(req.payload);
      const { id } = req.params;
      const { username, password } = req.payload;
      await this.service.editAuthenticationById(id, { username, password });
      return {
        status: 'success',
        message: 'Authentication berhasil diperbarui',
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

  async deleteAuthenticationByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this.service.deleteAuthenticationById(id);
      return {
        status: 'success',
        message: 'Authentication berhasil dihapus',
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
module.exports = AuthenticationHandler;
