/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */
const Redis = require('ioredis');
const Config = require('config');

let redisClient;

//Create and redis client instance
exports.init = () => {
  try {
    return new Redis({
      port: Config.redis_env.port,
      host: Config.redis_env.host,
      password: Config.redis_env.password,
      retryStrategy: times => {
        var delay = Math.min(times * 50, 2000);
        return delay;
      }
    });
  } catch (err) {
    console.log(`ERROR => ${err}`);
  }
};

exports.redisClient = redisClient;