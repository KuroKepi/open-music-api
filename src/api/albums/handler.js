const NotFoundError = require('../../exception/NotFoundError');

class AlbumsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
    this.putAlbumsByIdHandler = this.putAlbumsByIdHandler.bind(this);
    this.deleteAlbumsByIdHandler = this.deleteAlbumsByIdHandler.bind(this);
  }

  async postAlbumsHandler(req, h) {
    try {
      this.validator.validatePostAlbumsPayload(req.payload);
      const { name, year } = req.payload;
      const albumId = await this.service.addAlbums({ name, year });
      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId,
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

  async getAlbumsByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const albumData = await this.service.getAlbumsbyId(id);
      const album = {
        id: albumData.album.id,
        name: albumData.album.name,
        year: albumData.album.year,
        created_at: albumData.album.created_at,
        updated_at: albumData.album.updated_at,
        songs: albumData.song.slice(0, 2),
      };
      return {
        status: 'success',
        data: {
          album,
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

  async putAlbumsByIdHandler(req, h) {
    try {
      this.validator.validatePutAlbumsPayload(req.payload);
      const { id } = req.params;
      const { name, year } = req.payload;
      await this.service.editAlbumsById(id, { name, year });
      return {
        status: 'success',
        message: 'Album berhasil diperbarui',
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

  async deleteAlbumsByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this.service.deleteAlbumsById(id);
      return {
        status: 'success',
        message: 'Album berhasil dihapus',
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

module.exports = AlbumsHandler;
