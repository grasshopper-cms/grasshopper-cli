

module.exports = (function() {
    'use strict';

    var validate = {},
        q = require('q'),
        fs = require('fs'),
        path = require('path'),
        Git = require('git').Git;

    validate.hasGit = function () {
        var git = new Git(),
            deferred = q.defer();

        git.git('version', function(err, result) {
            if(err) {
                deferred.reject(err);
                return;
            }

            deferred.resolve(true);
        });

        return deferred.promise;
    };

    validate.hasPackageFile = function(projectHome) {
        var deferred = q.defer(),
            p = path.join(projectHome, 'package.json');

        fs.exists(p, function(exists){
           if(exists){
               deferred.resolve(true);
           }
           else {
               deferred.reject(new Error('Can\'t find package.json file (' + p + '). Please run the npm init command in your project home.'));
           }
        });

        return deferred.promise;
    };

    return validate;
})();