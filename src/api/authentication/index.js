const Authentication = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentication',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const authenticationHandler = new Authentication(service, validator);
    server.route(routes(authenticationHandler));
  },
};
