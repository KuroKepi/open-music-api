const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumsHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumsByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumsByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumsByIdHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => h.response({
      status: 'fail',
      message: 'Route tidak ditemukan',
      statusCode: 404,
    }).code(404),
  },
];
module.exports = routes;
