'use strict';

var q = require('q'),
    fs = require('fs'),
    logger = require('./logger');

module.exports = {
    directoryExistsAndWritable: function(dirpath){
        var deferred = q.defer();

        fs.stat (dirpath, function (err, stats){
            if (err && err.errno === 34) {
                logger.error('The directory at path: ' + dirpath + ' could not be found.');
                logger.error('Please fix and try again.');
                deferred.reject(new Error(dirpath + ' not found'));
            }
            else {
                //Test to see if the folder is writable
                if(!!(2 & parseInt ((stats.mode & parseInt ("777", 8)).toString (8)[0]))){
                    deferred.resolve();
                }
                else {
                    logger.error('The directory at path: ' + dirpath + ' is not writable.');
                    logger.error('Please fix and try again.');
                    deferred.reject(new Error(dirpath + ' not writable'));
                }
            }
        });

        return deferred.promise;
    }
}