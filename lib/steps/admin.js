'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    bower = require('./bower'),
    utilsFs = require('../utils/fs'),
    output = require('../utils/output'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer');

module.exports = function(config){
    var adminConfig = {
            buildDirectory : path.join('app', 'public', 'admin'),
            apiEndpoint : ''
        },
        questions = [{
            type: 'input',
            name: 'buildDirectory',
            message: 'Where do you want the Grasshopepr Admin Installed? (must be browsable on your server)',
            default: adminConfig.buildDirectory
        },{
            type: 'input',
            name: 'apiEndpoint',
            message: 'What is your API endpoint? (default is BLANK)'
        }],
        deferred = q.defer();

    logger.statement('');
    logger.statement('Configuring Grasshopper Admin...');
    baseConfig();

    return deferred.promise;

    function baseConfig(){
        inquirer.prompt(questions, function( answers ) {
            var conf = {
                buildDirectory: answers.buildDirectory,
                apiEndpoint: answers.apiEndpoint
            };

            _.merge(config, {
                admin: conf
            });


            utilsFs.directoryExistsAndWritable(conf.buildDirectory).then(
                function(){
                    writeConfig(config)
                        //.then(writeConfig)
                        .then(install)
                        .then(
                            function(){
                                deferred.resolve(config);
                            },
                            function(err){
                                logger.error('Install Failed! Reason: ' + err.message);
                                baseConfig();
                            }
                        )
                        .catch(function(err){
                            logger.error('Install Failed! Reason: ' + err.message);
                            baseConfig();
                        });
                },
                function(){
                    baseConfig();
                }
            );
        });
    }

    function install(config){
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

    function writeConfig(config){
        var tpl = _.template(
                fs.readFileSync(path.join(__dirname, '../../templates/admin.tpl'), 'utf-8')),
            output = tpl(config),
            deferred = q.defer();

        fs.writeFile(path.join(config.project.home, 'gha.json'), output, 'utf-8', function(err){
            if(err){
                throw err;
            }
            deferred.resolve(config);
        });

        return deferred.promise;
    }
};