'use strict';

var clc = require('cli-color');

module.exports = {
    notice: notice,
    statement: statement,
    error: error,
    trace: trace
};

function notice(str){
    console.log(clc.blue(str));
};

function statement(str){
    console.log(clc.green(str));
    console.log('');
};

function error(str) {
    console.log(clc.red(str));
    console.log('');
};

function trace(str) {
    console.log(clc.magenta(str));
    console.log('');
};