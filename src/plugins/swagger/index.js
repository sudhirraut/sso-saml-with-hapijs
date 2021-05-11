/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */
const Config = require('config');
const { resolve } = require('path');
const log = require('logger/logger');

const register = async (server) => {
  try {
    return server.register([
      require('@hapi/inert'),
      require('@hapi/vision'),
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'RAK RBAC MS APIs',
            description: 'RAK RBAC MS Api Documentation',
            version: '1.0',
            termsOfService: 'This documentation is private.',
            contact: {
              name: 'Admin',
              // url : '',
              email: 'admin@example.com',
            },
          },
          host: Config.server.host,
          basePath: Config.swagger_basepath,
          schemes: ['https', 'http'],
          tags: [
            {
              name: 'SSO',
              description: 'Single Sign On APIs',
            },
          ],
          grouping: 'tags',
          templates: resolve('public', 'templates'),
        },
      },
    ]);
  } catch (err) {
    log.error(`Error registering swagger plugin: ${err}`);
    return err;
  }
};

module.exports = {
  register,
  info: { name: 'Swagger Documentation', version: '1.0.0' },
};
