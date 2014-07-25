'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path');

module.exports = {
    hasPackageFile: function(config) {
        var deferred = q.defer(),
            p = path.join(config.project.home, 'package.json');

        fs.exists(p, function(exists){
           if(exists){
               deferred.resolve(config);
           }
           else {
               throw new Error('Can\'t find package.json file (' + p + '). Please run the npm init command in your project home.');
           }
        });

        return deferred.promise;
    },
    configFiles: function(){
        var deferred = q.defer(),
            pAdmin = path.join(process.cwd(), 'gha.json'),
            pApi = path.join(process.cwd(), 'ghapi.json'),
            config = {};

        fs.exists(pAdmin, function(exists){
            if(exists){
                _.merge(config, {
                    admin: require(pAdmin)
                });

                fs.exists(pApi, function(exists){
                    if(exists){
                        _.merge(config, require(pApi));
                        _.merge(config, {
                            project: {
                                home: process.cwd()
                            }
                        });

                        deferred.resolve(config);
                    }
                    else {
                        throw new Error('Can\'t find ghapi.json file (' + pApi + '). Please run this command in your project home.');
                    }
                });
            }
            else {
                throw new Error('Can\'t find gha.json file (' + pAdmin + '). Please run this command in your project home.');
            }
        });

        return deferred.promise;
    }
};