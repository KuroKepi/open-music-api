const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapSongsDBToModel } = require('../../utils');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class SongsService {
  constructor() {
    this.pool = new Pool();
  }

  async addSongs({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16).toString();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: ` INSERT INTO songs (id, title, year, genre, performer, duration, albumId, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id `,
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };
    const result = await this.pool.query(query);
    if (!result.rows[0]) {
      throw new InvariantError('Gagal menambahkan lagu');
    }
    return result.rows[0].id;
  }

  async getSong(query) {
    try {
      let sql = 'SELECT * FROM songs';
      const conditions = [];
      const values = [];
      if (query.title) {
        conditions.push(`title ILIKE $${values.length + 1}`);
        values.push(`%${query.title}%`);
      }
      if (query.performer) {
        conditions.push(`performer ILIKE $${values.length + 1}`);
        values.push(`%${query.performer}%`);
      }
      if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
      }
      const result = await this.pool.query(sql, values);
      return result.rows.map(mapSongsDBToModel);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapSongsDBToModel)[0];
  }

  async editSongsById(id, {
    title, year, genre, performer, duration,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: ' UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id ',
      values: [title, year, genre, performer, duration, updatedAt, id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu');
    }
    return result.rows.map(mapSongsDBToModel)[0];
  }

  async deleteSongsById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;
