'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    output = require('../utils/output'),
    logger = require('../utils/logger');

module.exports = function(config){
    var deferred = q.defer(),
        progress = output.progress({label: 'Making directories'}),
        directories = [
            makeDir('tmp'),
            makeDir('app'),
            makeDir('app/lib'),
            makeDir('app/views'),
            makeDir('app/routes'),
            makeDir('app/public'),
            makeDir('app/public/vendor'),
            makeDir('app/public/admin'),
            makeDir('app/public/assets'),
            makeDir('app/public/css'),
            copyFile('app/lib/grasshopper.js'),
            copyFile('app/routes/main.js'),
            copyFile('app/views/layout.jade'),
            copyFile('app/public/css/style.css'),
            copyFile('app/index.js')
        ];

    logger.statement('');
    logger.statement('Creating project scaffolding...');

    progress.start();

    deleteFolderRecursive('tmp');
    deleteFolderRecursive('app');

    directories.reduce(q.when, q({})).then(
        function(){
            progress.complete();
            deferred.resolve(config);
        },
        function(err){
            progress.complete();
            logger.error('');
            logger.error(err.message);
            deferred.reject(err);
        }
    );

    return deferred.promise;

    function makeDir(newDir) {
        return function(){
            var deferred = q.defer();

            fs.mkdir(path.join(config.project.home, newDir), '775', function(err){
                if(err){
                    deferred.reject(err);
                }

                deferred.resolve();
            });

            return deferred.promise;
        }
    }

    function copyFile(relativeSrc){
        var deferred = q.defer();

        return function(){
            fs.link(path.join(__dirname, '../../templates/sample', relativeSrc), path.join(config.project.home, relativeSrc), function(err){
                if(err){
                    deferred.reject(err);
                }

                deferred.resolve();
            });
        }
        return deferred.promise;
    }

    function deleteFolderRecursive(path) {
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};