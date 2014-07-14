'use strict';

var q = require('q'),
    fs = require('fs'),
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
    }
};