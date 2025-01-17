const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');
const SongsService = require('./services/postgres/SongsService');
const songs = require('./api/songs');
const SongsValidator = require('./validator/songs');
require('dotenv').config();

const init = async () => {
  const service = new AlbumsService();
  const serviceSongs = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: serviceSongs,
        validator: SongsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      if (typeof response.statusCode === 'number' && Number.isInteger(response.statusCode)) {
        newResponse.code(response.statusCode);
      } else {
        newResponse.code(500);
      }
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
