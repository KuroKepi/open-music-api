const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongsByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongsByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongsByIdHandler,
  },
  {
    method: '*',
    path: '/pbulic/{any*}',
    handler: (request, h) => h.response({
      status: 'fail',
      message: 'Route tidak ditemukan',
      statusCode: 404,
    }).code(404),
  },
];
module.exports = routes;
