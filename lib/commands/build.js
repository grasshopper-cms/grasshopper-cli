'use strict';

var q = require('q'),
    os = require('os'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    steps = require('../steps'),
    db = require('../utils/mongo'),
    output = require('../utils/output'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer'),
    guid = require('../utils/guid');

module.exports = function(){
    var questions = [{
            type: 'list',
            name: 'start',
            message: 'Do you want to continue?',
            choices: ['Yes', 'No']
        }],
        validate = require('../validate');


    logger.statement("You are about to recompile your admin application using your existing config files.");


    inquirer.prompt(questions, function( answers ) {

        if(answers.start === 'Yes'){

            q.delay(10)
                .then(validate.configFiles)
                .then(validate.hasPackageFile)
                .then(installAdmin)
                .then(function(results){
                    output.setupCompleted();
                    logger.notice('');
                    logger.notice('Please restart your application for your changes to take effect');
                })
                .catch(function(err){
                    logger.error('');
                    logger.error('Setup failed!');
                    logger.error('Reason: ' + err.message);
                });
        }
        else {
            logger.notice('');
            logger.notice('Quit without installing.');
        }
    });
};

function installAdmin(config){
    var exec = require('child_process').exec,
        cmd = path.join(config.project.home, './node_modules/.bin/grasshopper build'),
        child = exec(cmd, function(err, stdout, stderr){
            if(err) {
                console.log('exec error: ' + err);
            }
        }),
        progress = output.progress({label: 'Building grasshopper-admin. Please wait, this can take a few minutes.'}),
        deferred = q.defer();

    logger.trace('');
    logger.trace('RUNNING: ' + cmd);

    progress.start();

    child.on('error', function(err){
        deferred.reject(err);
    });

    child.on('close', function(code){
        if(code === 0){
            progress.complete();
            deferred.resolve(config);
        }
        else {
            deferred.reject(new Error(code));
        }
    });

    return deferred.promise;
}
