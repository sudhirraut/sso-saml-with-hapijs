/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const Config = require('config');

exports.HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

exports.MS_URLS = {
  UPSKILLING_BASE_URL: `${Config.upskilling_ms_env.protocol}://${Config.upskilling_ms_env.host
  }${(Config.upskilling_ms_env.port !== '') ? ':' : ''}${Config.upskilling_ms_env.port
  }${(Config.upskilling_ms_env.directory !== '') ? (`/${Config.upskilling_ms_env.directory}`) : ''}`,

  KEYCLOAK_BASE_URL: `${Config.keycloak_env.protocol}://${Config.keycloak_env.host
  }${(Config.keycloak_env.port !== '') ? ':' : ''}${Config.keycloak_env.port
  }${(Config.keycloak_env.directory !== '') ? (`/${Config.keycloak_env.directory}`) : ''}`,
};

exports.CONTENT_TYPE = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data',
  XML: 'application/xml',
  TEXT_XML: 'text/xml',
};
