'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    steps = require('../steps'),
    output = require('../utils/output'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer'),
    guid = require('../utils/guid');

module.exports = function(){
    var questions = [{
            type: 'input',
            name: 'path',
            message: 'Enter your project\'s home directory',
            default: process.cwd()
        }
            /*,{
            type: 'list',
            name: 'installType',
            message: 'What type of install would you like?',
            choices: ['Quick', 'Custom']
        }*/],
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

        //if(answers.installType === 'Quick') {
            validate.hasPackageFile(config)
                .then(steps.npms)
                .then(steps.database)
                .then(steps.assets)
                .then(steps.logger)
                .then(writeConfig)
                .then(function(results){
                    output.setupCompleted();
                })
                .catch(function(err){
                    logger.error('');
                    logger.error('Setup failed!');
                    logger.error('Reason: ' + err.message);
                });
        //}
    });
};

function writeConfig(config){
    console.log(path.join(__dirname, '../../templates/core.tpl'));

    var tpl = _.template(
            fs.readFileSync(path.join(__dirname, '../../templates/core.tpl'), 'utf-8')),
        output = tpl(config),
        deferred = q.defer();

    fs.writeFile(path.join(config.project.home, 'ghapi.json'), output, 'utf-8', function(err){
        if(err){
            throw err;
        }
        deferred.resolve(config);
    });

    return deferred.promise;
}
