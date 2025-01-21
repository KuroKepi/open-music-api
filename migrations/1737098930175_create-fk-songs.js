/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.addConstraint('songs', 'fk_songs_albumid_albums_id', {
    foreignKeys: {
      columns: 'albumid',
      references: 'albums(id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs_albumid_albums_id');
};
