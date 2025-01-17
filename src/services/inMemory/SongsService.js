const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class Songsservice {
  constructor() {
    this.Songs = [];
  }

  async addSongs({
    title, year, genre, performer, duration, albumId,
  }) {
    try {
      const id = nanoid(16);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const Songs = {
        title, year, genre, performer, duration, albumId, createdAt, updatedAt,
      };
      this.Songs.push(Songs);
      return id;
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }

  async getSong() {
    return this.Songs;
  }

  async getSongsById(id) {
    const Songs = this.Songs.find((a) => a.id === id);
    if (!Songs) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return Songs;
  }

  async editSongsById(id, {
    title, year, genre, performer, duration,
  }) {
    const index = this.Songs.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Song. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    this.Songss[index] = {
      ...this.Songs[index],
      title,
      year,
      genre,
      performer,
      duration,
      updatedAt,
    };
  }

  async deleteSongsById(id) {
    const index = this.Songs.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
    this.Songs.splice(index, 1);
  }
}
module.exports = Songsservice;
