'use strict';

var q = require('q');

module.exports = {
    buildConfig: buildConfig,
    validateTmpDir: validateTmpDir
};

function buildConfig(){
    return {
        default: 'local',
        tmpdir: 'path',
        engines: {
            local: {
                path: '',
                urlbase: ''
            }
        }
    };
}

function validateTmpDir(dirpath){
    var deferred = q.defer();

    deferred.resolve();

    return deferred.promise;
}