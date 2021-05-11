/* eslint-disable import/no-unresolved */
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */
const log = require('logger/logger');


const register = async (server) => {
  try {
    return server.register([
      // eslint-disable-next-line global-require
      require('hapi-auth-jwt2'),
    ]);
  } catch (err) {
    log.error(`Error registering hapi-auth-jwt2 plugin: ${err}`);
    return err;
  }
};

module.exports = {
  register,
  info: { name: 'Hapi JWT Plugin', version: '1.0.0' },
};
