const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class AlbumssService {
  constructor() {
    this.Albums = [];
  }

  async addAlbums({ name, year }) {
    try {
      const id = nanoid(16);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      const Albums = {
        id, name, year, createdAt, updatedAt,
      };
      this.Albums.push(Albums);
      return id;
    } catch (error) {
      throw new InvariantError(error.message);
    }
  }

  async getAlbumsById(id) {
    const Albums = this.Albums.find((a) => a.id === id);
    if (!Albums) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return Albums;
  }

  async editAlbumsById(id, { name, year }) {
    const index = this.Albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Album. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    this.Albums[index] = {
      ...this.Albums[index],
      name,
      year,
      updatedAt,
    };
  }

  async deleteAlbumsById(id) {
    const index = this.Albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
    this.Albums.splice(index, 1);
  }
}
module.exports = AlbumssService;
