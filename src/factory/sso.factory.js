/* eslint-disable import/no-unresolved */
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const Response = require('src/utils/response');
const RESPONSE_MESSAGES = require('src/utils/response-messages');
const STATUS_CODES = require('src/utils/status-codes');
const AuthUtility = require('src/utils/auth');
const to = require('src/utils/promise-handler');
const UsersInterface = require('src/interfaces/users.interface');
const { readFileSync, writeFile } = require('fs');
const SamlifyFactory = require('src/factory/samlify.factory');

// Temporary function

const getUser = (login) => {
  if (login === '   ') {
    return {
      user_id: '21b06b08-f296-42f4-81aa-73fb5a8eac67',
      email: login,
    };
  }
  return null;
};

const ServiceProviderAcs = async (request, h) => {
  try {
    const { extract } = await SamlifyFactory.ServiceProviderEnc.parseLoginResponse(SamlifyFactory.OktaIdentityProviderEnc, 'post', request);
    const { login } = extract.attributes;
    // get your system user
    const payload = getUser(login);

    // assign req user
    if (payload) {
      // create session and redirect to the session page
      const token = AuthUtility.createToken(payload);
      return h.redirect(`/?auth_token=${token}`);
    }
    return h.response(Response.sendResponse(false, null, 'ERR_USER_NOT_FOUND', STATUS_CODES.BAD_REQUEST)).code(STATUS_CODES.BAD_REQUEST);
  } catch (e) {
    console.error('[FATAL] when parsing login response sent from okta', e);
    return h.redirect('/');
  }
};

const SSOLoginRedirect = async (request, h) => {
  const { id, context: redirectUrl } = await SamlifyFactory.ServiceProviderEnc.createLoginRequest(SamlifyFactory.OktaIdentityProviderEnc, 'redirect');
  return h.redirect(redirectUrl);
};

const SSOLogoutRedirect = async (request, h) => {
  try {
    const { context: redirectUrl } = await SamlifyFactory.ServiceProviderEnc.createLogoutRequest(SamlifyFactory.OktaIdentityProviderEnc, 'redirect', { logoutNameID: '   ' });
    return h.redirect(redirectUrl);
  } catch (err) {
    return h.response(Response.sendResponse(false, err, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR)).code(STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};


const SSOLogout = async (request, h) => {
  try {
    const { extract } = await SamlifyFactory.ServiceProviderEnc.parseLogoutResponse(SamlifyFactory.OktaIdentityProviderEnc, 'post', request);
    return h.redirect('/logout');
  } catch (err) {
    return h.response(Response.sendResponse(false, err, RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR)).code(STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  ServiceProviderAcs,
  SSOLoginRedirect,
  SSOLogoutRedirect,
  SSOLogout,
};
