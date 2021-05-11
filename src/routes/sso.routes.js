/* eslint-disable import/no-unresolved */
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const UsersController = require('src/controllers/sso.controller');

module.exports = [
  { method: 'POST', path: '/v1/login/callback', options: UsersController.ServiceProviderAcs },
  { method: 'GET', path: '/v1/login', options: UsersController.SSOLoginRedirect },
  { method: 'POST', path: '/v1/sp/sso/logout', options: UsersController.SSOLogout },
  { method: 'GET', path: '/v1/sp/single-logout/redirect', options: UsersController.SSOLogoutRedirect },
 
];
