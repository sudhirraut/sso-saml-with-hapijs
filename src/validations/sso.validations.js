
/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */

const Joi = require('@hapi/joi');

/**
 * Input JSON validation
 *
 * @type {{}}
 */
module.exports = (() => ({
  sp_logout: {
    headers: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true }),
    failAction: (request, h, err) => err,
  },
  single_logout: {
    headers: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true }),
    failAction: (request, h, err) => err,
  },
  
  
}))();
