const mapSongsDBToModel = ({
  id, title, year, performer, genre, duration, albumId, created_at: createdAt,
  updated_at: updatedAt,
}) => ({
  id, title, year, performer, genre, duration, albumId, createdAt, updatedAt,
});

const mapPlaylistsDBToModel = ({
  id, name, owner, created_at: createdAt,
  updated_at: updatedAt,
}) => ({
  id, name, owner, createdAt, updatedAt,
});

module.exports = { mapSongsDBToModel, mapPlaylistsDBToModel };
