/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */
const samlify = require('samlify');
const fs = require('fs');
const path = require('path');
const validator = require('@authenio/samlify-node-xmllint');

const { binding } = samlify.Constants.namespace;

samlify.setSchemaValidator(validator);

const OktaIdentityProviderEnc = samlify.IdentityProvider({
  metadata: fs.readFileSync(path.resolve(__dirname, '..', '..', 'okta/metadata/ms.xml')),
  isAssertionEncrypted: true,
  messageSigningOrder: 'encrypt-then-sign',
  wantLogoutRequestSigned: true,
});


// encrypted response
const ServiceProviderEnc = samlify.ServiceProvider({
  entityID: 'http://localhost:8080/metadata?encrypted=true',
  authnRequestsSigned: false,
  wantAssertionsSigned: true,
  wantMessageSigned: true,
  wantLogoutResponseSigned: true,
  wantLogoutRequestSigned: true,
  privateKey: fs.readFileSync(path.resolve(__dirname, '..', '..', 'okta/key/ms.pem')),
  privateKeyPass: 'VHOSp5RUiBcrsjrcAuXFwU1NKCkGA8px',
  encPrivateKey: fs.readFileSync(path.resolve(__dirname, '..', '..', 'okta/key/ms.pem')),
  assertionConsumerService: [{
    Binding: binding.post,
    Location: 'http://localhost:8080/sp/acs?encrypted=true',
  }],
});

module.exports = {
  OktaIdentityProviderEnc,
  ServiceProviderEnc,
};
