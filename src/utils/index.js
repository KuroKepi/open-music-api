const mapSongsDBToModel = ({
  id, title, year, performer, genre, duration, albumId, created_at: createdAt,
  updated_at: updatedAt,
}) => ({
  id, title, year, performer, genre, duration, albumId, createdAt, updatedAt,
});

module.exports = { mapSongsDBToModel };
