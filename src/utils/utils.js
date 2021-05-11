/*
 * Created on Fri Aug 09 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const CryptoJS = require('crypto-js');


exports.createHash = (str) => CryptoJS.SHA256(str).toString(CryptoJS.enc.Base64);
