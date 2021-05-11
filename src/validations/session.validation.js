/* eslint-disable import/no-unresolved */

/*
 * Created on Fri Sep 20 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const log = require('logger/logger');
const to = require('src/utils/promise-handler');
const Redis = require('databases/redis');
const Config = require('config');
const User = require('src/classes/Users');
const JWTAuth = require('src/utils/auth');


exports.verify = async (decoded, request) => {
  try {
    if (`${request.method.toUpperCase()}-${request.url.pathname}` === 'GET-/v1/sessions') {
      const organization = request.query.organization_id ? request.query.organization_id : 'ORG001';
      request.server.app.user = new User(null, decoded.preferred_username, decoded.given_name, decoded.family_name, decoded.email, decoded.photo_url, organization);
      return { isValid: true, credentials: request.server.app.user };
    }
    const tokenData = JWTAuth.verifyToken(request.headers.authorization);
    request.server.app.user = new User(tokenData.id, tokenData.username, tokenData.first_name, tokenData.last_name, tokenData.email_id, tokenData.photo_url, tokenData.organization_id);
    // If endpoint is other than 'GET-/v1/sessions' then check for redis session
    const redisClient = Redis.init();
    let err = null;
    let userSession = null;
    const sessionKey = decoded.organization_id ? `${Config.env}_${decoded.organization_id}_${tokenData.email_id}` : `${Config.env}_${tokenData.email_id}`;
    [err, userSession] = await to(redisClient.hgetall(sessionKey));

    redisClient.quit();
    if (err) {
      log.error('ERROR => ', err);
      return { isValid: false, credentials: err };
    }
    if (Object.entries(userSession).length > 0) {
      if (userSession.email_id === tokenData.email_id) {
        return { isValid: true, credentials: tokenData };
      }
      log.error('ERR => 2');

      return { isValid: false, credentials: {} };
    }
    log.error('ERR => 3');

    return { isValid: false, credentials: {} };
  } catch (err) {
    log.error('ERR => ', err);
    return { isValid: false, credentials: err };
  }
};
