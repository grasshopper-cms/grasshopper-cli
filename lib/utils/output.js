'use strict';

var stream = process.stderr,
    logger = require('./logger');

module.exports = {
    welcome: welcome,
    progress: progress
}

function welcome(){
    logger.notice('');
    logger.notice('                      ___ --.');
    logger.notice('                    .`   \'.  \\');
    logger.notice('               ,_          | |');
    logger.notice('         .""""""|\'.""""""-./-;');
    logger.notice('       |__.----| \\ \'.      |0 \\');
    logger.notice('    __/ /  /  /|  \\  \'.____|__|');
    logger.notice('    `""""""""`"|`""\'---\'|  \\');
    logger.notice('           .---\'        /_  |_');
    logger.notice('');
}

function progress(options){
    var currIndex = 0,
        smallChar = '･',
        largeChar = '●',
        size = 5,
        timer;

    return {
        start: start,
        complete: complete
    };

    function complete(){
        var str = (options.label || '') + ' [Complete]';
        clearInterval(timer);

        if (!stream.isTTY) {
            return;
        }

        stream.clearLine();
        stream.cursorTo(0);
        stream.write(str);
    }

    function start(){
        timer = setInterval(tick, 500);
    }

    function tick(){
        var out = '',
            str = (options.label || '') + ' ';

        if (!stream.isTTY) {
            return;
        }

        if(currIndex === size) {
            currIndex = 0;
        }

        for(var x = 0; x < size; x++ ){
            str += (x === currIndex) ? largeChar : smallChar;
        }

        if (out !== str) {
            stream.clearLine();
            stream.cursorTo(0);
            stream.write(str);
            out = str;
            currIndex++;
        }
    }
}