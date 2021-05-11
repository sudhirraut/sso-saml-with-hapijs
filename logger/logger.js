/*
 * Created on Tue Aug 06 2019
 *
 *  Created by Sudhir Raut    
 * Copyright (c) 2019   .
 */


var loggingConfig  = require('config').logging;
var bunyan         = require('bunyan'); // Bunyan dependency

var logger = bunyan.createLogger({
    name: loggingConfig.name,
    serializers: bunyan.stdSerializers,
    streams: [
        {
            level: loggingConfig.level,
            path: loggingConfig.path
        },
        {
            level: bunyan.ERROR,
            stream: process.stdout
        }, {
            level: bunyan.DEBUG,
            stream: process.stdout
        },
        {
            level: bunyan.INFO,
            stream: process.stdout
        }
    ]
});

module.exports = logger;
