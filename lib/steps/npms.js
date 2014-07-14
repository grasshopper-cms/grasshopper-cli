'use strict';

var q = require('q'),
    _ = require('lodash'),
    npm = require('../npm'),
    output = require('../output'),
    logger = require('../logger');

module.exports = function(config){
    var deferred = q.defer(),
        progress = output.progress({label: 'Installing grasshopper-api'});


    //deferred.resolve(config);
    //return deferred.promise;

    progress.start();

    npm.install('grasshopper-api').then(
        function(){
            progress.complete();

            progress = output.progress({label: 'Installing grasshopper-admin'});
            progress.start();

            npm.install('grasshopper-admin').then(
                function(){
                    progress.complete();
                    deferred.resolve(config);
                },
                function(err){
                    logger.error('Could not install npm `grasshopper-admin` error: ' + err.message);
                    throw err;
                }
            );
        },
        function(err){
            logger.error('Could not install npm `grasshopper-api` error: ' + err.message);
            throw err;
        }
    );

    return deferred.promise;
};

