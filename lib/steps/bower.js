'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    utilsFs = require('../utils/fs'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer');

module.exports = {
    validate: validate
}

function validate(config){
    var deferred = q.defer();

    fs.readFile(path.join(config.project.home, '.bowerrc'), 'utf8', function(err, file){
        if(!err){
            logger.notice('.bowerrc file found. Continuing...');
            utilsFs.directoryExistsAndWritable(JSON.parse(file).directory).then(
                function(){
                    deferred.resolve(config);
                },
                function(){
                    configureBower()
                });
        }
        else {
            logger.statement('');
            logger.error('.bowerrc file not found. Bower needs to be setup.');
            logger.statement('Bower Setup...');
            configureBower();
        }
    });

    return deferred.promise;

    function configureBower(){
        inquirer.prompt([{
            type: 'input',
            name: 'directory',
            message: 'What is the path in which installed `bower` components should be saved?',
            default: path.join('app', 'public', 'vendor')
        }], function( answers ) {
            utilsFs.directoryExistsAndWritable(answers.directory).then(
                function(){
                    fs.writeFile(path.join(config.project.home, '.bowerrc'), '{"directory": "' + answers.directory + '"}', 'utf-8', function(err){
                        if(err){
                            throw err;
                        }
                        deferred.resolve(config);
                    });
                },
                function(){
                    configureBower()
                });
        });
    }
}