/*
 * Created on Fri Aug 09 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

/**
  * Function to handle errors in promises
  */
module.exports = (promise) => promise.then((data) => [null, data])
  .catch((err) => [err]);
