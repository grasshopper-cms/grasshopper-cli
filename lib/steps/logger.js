'use strict';

var q = require('q'),
    _ = require('lodash'),
    path = require('path'),
    logger = require('../logger'),
    inquirer = require('inquirer');

module.exports = function(config){
    var questions = [{
            type: 'input',
            name: 'appName',
            message: 'What is the name of your application?'
        },{
            type: 'input',
            name: 'machineName',
            message: 'What is the name of this machine?'
        },{
            type: 'checkbox',
            name: 'types',
            message: 'Select adapters that you would like to use?',
            choices: ['Console', 'File']
        }],
        deferred = q.defer();

    logger.statement('');
    logger.statement('Configuring Grasshopper Logging...');
    askQuestions();

    return deferred.promise;

    function askQuestions(){
        inquirer.prompt(questions, function( answers ) {
            if(
                _.find(answers.types, function(type) {
                    return type === 'File';
                })
                ){
                inquirer.prompt([{
                    type: 'input',
                    name: 'fileLocation',
                    message: 'Where do you want to save your logs?',
                    default: path.join(config.project.home, 'logs', answers.appName + '.log')
                }], function( fileLocation ) {
                    buildConfig(_.merge(answers, fileLocation));
                });
            }
            else {
                buildConfig(answers);
            }

        });
    }

    function buildConfig(conf) {
        var logger = {
            adapters: []
        };

        _.each(conf.types, function(type) {
            var adapter = {
                type: type.toLowerCase(),
                application: conf.appName,
                machine: conf.machineName
            };

            if(type === 'File'){
                adapter.path = conf.fileLocation;
            }

            logger.adapters.push(adapter);
        });

        deferred.resolve(_.merge(config, logger));
    }
};

