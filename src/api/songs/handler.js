const NotFoundError = require('../../exception/NotFoundError');

class SongsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postSongsHandler = this.postSongsHandler.bind(this);
    this.getSongHandler = this.getSongHandler.bind(this);
    this.getSongsByIdHandler = this.getSongsByIdHandler.bind(this);
    this.putSongsByIdHandler = this.putSongsByIdHandler.bind(this);
    this.deleteSongsByIdHandler = this.deleteSongsByIdHandler.bind(this);
  }

  async postSongsHandler(req, h) {
    try {
      this.validator.validatePostSongsPayload(req.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = req.payload;
      const songId = await this.service.addSongs({
        title, year, genre, performer, duration, albumId,
      });
      const response = h.response({
        status: 'success',
        message: 'Song berhasil ditambahkan',
        data: {
          songId,
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

  async getSongHandler(req) {
    const { query } = req;
    const songs = await this.service.getSong(query);
    const filteredSongs = songs.slice(0, 2).map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
    return {
      status: 'success',
      data: {
        songs: filteredSongs,
      },
    };
  }

  async getSongsByIdHandler(req) {
    const { id } = req.params;
    const song = await this.service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongsByIdHandler(req, h) {
    try {
      this.validator.validatePutSongsPayload(req.payload);
      const { id } = req.params;
      const {
        title, year, genre, performer, duration,
      } = req.payload;
      await this.service.editSongsById(id, {
        title, year, genre, performer, duration,
      });
      return {
        status: 'success',
        message: 'Song berhasil diperbarui',
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

  async deleteSongsByIdHandler(req) {
    const { id } = req.params;
    await this.service.deleteSongsById(id);
    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
