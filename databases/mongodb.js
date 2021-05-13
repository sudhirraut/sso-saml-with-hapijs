/*
 * Created on Fri Jul 03 2020 3:31:39 PM
 *
 * Created by Sudhir Raut
 * Copyright (c) 2020  
 */

const Mongoose = require('mongoose');
const Config = require('config');
const log = require('logger/logger');


exports.init = () => {
  let connectionURI = '';
  if (Config.env === 'local' || Config.env === 'test') {
    if (Config.database.mongo.username && Config.database.mongo.password) {
      connectionURI = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}?authSource=admin`;
    } else {
      connectionURI = `mongodb://${Config.database.mongo.host}:${Config.database.mongo.port}/${Config.database.mongo.name}`;
    }
  } else if (Config.database.mongo.username && Config.database.mongo.password) {
    // connection_uri = `mongodb://${config.database.mongo.username}:${config.database.mongo.password}@${config.database.mongo.clusterHosts}/${config.database.mongo.name}?authSource=admin&replicaSet=${config.database.mongo.replicaSetName}`;
    connectionURI = `mongodb://${Config.database.mongo.username}:${Config.database.mongo.password}@${Config.replicaConfig.clusterHosts}/${Config.database.mongo.name}?replicaSet=${Config.replicaConfig.replicaSetName}&authSource=admin`;
  } else {
    connectionURI = `mongodb://${Config.replicaConfig.clusterHosts}/${Config.database.mongo.name}?replicaSet=${Config.replicaConfig.replicaSetName}`;
  }

  Mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10,
  });
  Mongoose.connection.on('connected', () => {
    log.info(`Mongoose default connection open to mongodb://${Config.database.mongo.host}/${Config.database.mongo.name}`);
  });

  Mongoose.connection.on('error', (err) => {
    log.info(`Mongoose default connection error => ${err}`);
  });

  Mongoose.connection.on('disconnected', () => {
    log.info('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    Mongoose.connection.close(() => {
      log.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};
