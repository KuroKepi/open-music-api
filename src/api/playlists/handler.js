const ClientError = require('../../exception/ClientError');

class PlaylistsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistsHandler(req, h) {
    try {
      this.validator.validatePostPlaylistsPayload(req.payload);
      const { name } = req.payload;
      const { id: credentialId } = req.auth.credentials;
      const playlistId = await this.service.addPlaylists({ name, owner: credentialId });
      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsHandler(req, h) {
    try {
      const { id: credentialId } = req.auth.credentials;
      const playlists = await this.service.getPlaylists({ owner: credentialId });
      const playlistsProps = playlists.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        username: playlist.owner,
      }));
      return {
        status: 'success',
        data: {
          playlists: playlistsProps,
        },
      };
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }

  async deletePlaylistByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const { owner: credentialId } = req.auth.credentials;
      await this.service.deletePlaylists(id, credentialId);
      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }
}
module.exports = PlaylistsHandler;
