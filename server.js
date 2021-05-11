const Hapi = require('@hapi/hapi'),
  Config = require('config'),
  log = require('logger/logger'),
  Routes = require('src/routes'),
  cluster = require('cluster'),
  numberOfCPUs = require('os').cpus().length,
  plugins = require('src/plugins/index'),
  { verify } = require('src/validations/session.validation');

exports.init = async (database) => {
  try {
    const port = process.env.PORT || Config.server.port;

    if (process.env.NODE_ENV !== 'test' && cluster.isMaster) {
      // jira_consumer.jira_consumer();
      for (let i = 0; i < numberOfCPUs; i++) {
        let worker = cluster.fork();
        log.info('worker %s started.', worker.id);
      }
    } else {
      let serverConnectionOptions = {
        // debug: { request: ['error'] },
        port: port,
        state: {
          strictHeader: false,
          ignoreErrors: true
        },
        routes: {
          cors: true,
          timeout: {
            server: 1200000, // 1,200,000 or 20 minutes
            socket: 1300000
          }
        }
      }
      if (Config.env === 'production' || Config.env === 'preprod') {
        serverConnectionOptions.routes.cors = {
          origin: ['https://www.example.com'],
          headers: ['Accept', 'Content-Type'],
          additionalHeaders: ['X-Requested-With']
        };
      }
      const server = new Hapi.Server(serverConnectionOptions);

      //  Setup Hapi Plugins
      const pluginOptions = { database };

      let plugin_promises = [];

      plugins().forEach(pluginName => {
        if (!((Config.env === 'production' || Config.env === 'preprod') && pluginName === 'swagger')) {
          var plugin = require('./src/plugins/' + pluginName);

          log.info(`Register Plugin ${plugin.info.name} - ${plugin.info.version}`);
          plugin_promises.push(plugin.register(server, pluginOptions));
        }
      });

      await Promise.all(plugin_promises);

      server.auth.strategy('jwt', 'jwt', { verify });
      server.auth.default('jwt');

      log.info('All plugins registered successfully.');

      for (const route in Routes) {
        server.route(Routes[route]);
      }

      server.start();

      server.events.on('response', request => {
        if (request.response) {
          log.error(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.pathname} --> ${request.response.statusCode}`);
        } else {
          log.info('No statusCode : ', request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.pathname + ' --> ');
        }
      });

      server.events.on('route', (route) => {
        console.log(`New route added: ${route.path}`);
      });
      server.events.on('start', (route) => {
        log.info('Node server is running on ==> ', server.info.uri);
      });

      server.events.on('stop', (route) => {
        console.log('Server has been stopped');
      });

      return server;
    }
  } catch (err) {
    log.error('Error starting server: ', err);
    throw err;
  }
}
