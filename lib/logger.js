module.exports = ( function(){
    'use strict';

    var clc = require('cli-color'),
        logger = {};

    logger.notice = function(str){
        console.log(clc.blue(str));
    };

    logger.statement = function(str){
        console.log(clc.green(str));
        console.log('');
    };

    logger.error = function(str) {
        console.log(clc.red(str));
        console.log('');
    };

    logger.trace = function(str) {
        console.log(clc.magenta(str));
        console.log('');
    };

    return logger;
} )();