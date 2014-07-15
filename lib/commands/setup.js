'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    steps = require('../steps'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer'),
    guid = require('../utils/guid');

module.exports = function(){
    var questions = [{
            type: 'input',
            name: 'path',
            message: 'Enter your project\'s home directory',
            default: process.cwd()
        },{
            type: 'list',
            name: 'installType',
            message: 'What type of install would you like?',
            choices: ['Quick', 'Custom']
        }],
        validate = require('../validate');


    logger.statement('Grasshopper Setup, please answer a few questions to get started.');

    inquirer.prompt(questions, function( answers ) {
        var config = {
            project: {
                home: answers.path
            },
            crypto: {
                secret: guid()
            }
        };

        if(answers.installType === 'Quick') {
            validate.hasPackageFile(config)
                .then(steps.npms)
                .then(steps.database)
                //.then(configureAssets)
                .then(steps.logger)
                .then(writeConfig)
                .catch(function(err){
                    logger.error(err.message);
                })
                .done(function(results){
                    console.log(results);
                });
        }
    });
};

function writeConfig(config){
    var tpl = _.template(fs.readFileSync(path.join(__dirname, '../../templates/core.tpl'), 'utf-8')),
        output = tpl(config),
        deferred = q.defer();

    fs.writeFile(config.project.home, output, 'utf-8', function(err){
        if(err){
            throw err;
        }
        deferred.resolve(config);
    });

    return deferred.promise;
}
