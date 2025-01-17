const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class AlbumsService {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbums({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO Albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };
    const result = await this.pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Albums gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getAlbumsbyId(id) {
    try {
      const album = await this.pool.query(`
        SELECT 
          a.*,
          s.id AS song_id,
          s.title AS song_title,
          s.performer AS song_performer
        FROM 
          Albums a
        LEFT JOIN 
          Songs s ON a.id = s.albumId
        WHERE 
          a.id = $1
      `, [id]);
      if (!album.rows.length) {
        throw new NotFoundError('Albums tidak ditemukan');
      }
      const albumData = album.rows[0];
      const song = album.rows.filter((row) => row.song_id !== null).map((row) => ({
        id: row.song_id,
        title: row.song_title,
        performer: row.song_performer,
      }));
      return {
        album: albumData,
        song,
      };
    } catch (error) {
      throw new NotFoundError('Albums tidak ditemukan');
    }
  }

  async editAlbumsById(id, { name, year }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE Albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui Album. Id tidak ditemukan');
    }
  }

  async deleteAlbumsById(id) {
    const query = {
      text: 'DELETE FROM Albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
