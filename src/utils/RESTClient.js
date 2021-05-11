/* eslint-disable import/no-unresolved */

/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const CallAPI = require('src/classes/RESTClient');


module.exports = (options) => new Promise((resolve, reject) => {
  const data = new CallAPI(options);
  data.makeRequest(resolve, reject);
});
