/* eslint-disable import/no-unresolved */
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const Validations = require('src/validations/sso.validations');
const SSOFactory = require('src/factory/sso.factory');


const ServiceProviderAcs = {
  description: 'SSO login API',
  tags: ['api', 'SSO'],
  auth: false,
  plugins: {
    'hapi-swagger': {
      responses: {
        200: { description: 'Success' },
        400: { description: 'Bad Request' },
        401: { description: 'Invalid credentials' },
        500: { description: 'Exception at server side' },
      },
    },
  },
  handler: async (request, h) => SSOFactory.ServiceProviderAcs(request, h),
};


const SSOLogout = {
  description: 'SSO logout API',
  tags: ['api', 'SSO'],
  auth: 'jwt',
  validate: Validations.sp_logout,
  plugins: {
    'hapi-swagger': {
      responses: {
        200: { description: 'Success' },
        400: { description: 'Bad Request' },
        401: { description: 'Invalid credentials' },
        500: { description: 'Exception at server side' },
      },
    },
  },
  handler: async (request, h) => SSOFactory.SSOLogout(request, h),
};

const SSOLoginRedirect = {
  description: 'SSO Login Redirect API',
  tags: ['api', 'SSO'],
  auth: false,
  plugins: {
    'hapi-swagger': {
      responses: {
        200: { description: 'Success' },
        400: { description: 'Bad Request' },
        401: { description: 'Invalid credentials' },
        500: { description: 'Exception at server side' },
      },
    },
  },
  handler: async (request, h) => SSOFactory.SSOLoginRedirect(request, h),
};

const SSOLogoutRedirect = {
  description: 'SSO Login Redirect API',
  tags: ['api', 'SSO'],
  auth: 'jwt',
  plugins: {
    'hapi-swagger': {
      responses: {
        200: { description: 'Success' },
        400: { description: 'Bad Request' },
        401: { description: 'Invalid credentials' },
        500: { description: 'Exception at server side' },
      },
    },
  },
  handler: async (request, h) => SSOFactory.SSOLogoutRedirect(request, h),
};



module.exports = {
  ServiceProviderAcs,
  SSOLoginRedirect,
  SSOLogout,
  SSOLogoutRedirect,
};
