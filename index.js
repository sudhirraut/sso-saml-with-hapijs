/* eslint-disable import/no-unresolved */
process.env.NODE_ENV = 'env-local';
require('app-module-path').addPath(__dirname);

const log = require('logger/logger');
const Server = require('./server');
const MongoDatabase = require('./databases/mongodb');
const RabbitMQConsumer = require('./queues');

// require('app-module-path').addPath(__dirname);
log.info(`Running environment ==> ${process.env.NODE_ENV}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
  log.error(`uncaughtException ==> ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
  log.error(`unhandledRejection ==> ${reason}`);
});

(async () => {
  // Init Database
  const dbConn = await MongoDatabase.init();
  // Start node server
  await Server.init(dbConn);
  // Start RabbitMQ consumer
  RabbitMQConsumer.start();
})();
