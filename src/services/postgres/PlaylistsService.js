const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exception/InvariantError');
const { mapPlaylistsDBToModel } = require('../../utils');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylists({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: ` INSERT INTO playlists (id, name, owner, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5) RETURNING id `,
      values: [id, name, owner, createdAt, updatedAt],
    };
    const result = await this.pool.query(query);
    if (!result.rows[0]) {
      throw new InvariantError('Gagal menambahkan playlist');
    }
    return result.rows[0].id;
  }

  async getPlaylists({ owner }) {
    const query = {
      text: 'SELECT * FROM playlists WHERE owner = $1 LIMIT 2',
      values: [owner],
    };
    const result = await this.pool.query(query);
    return result.rows.map(mapPlaylistsDBToModel);
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}
module.exports = PlaylistsService;
