'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer');

module.exports = function(config){
    var assetConfig = {
            default: 'local',
            tmpdir: path.join(config.project.home, 'tmp'),
            engines: {}
        },
        questions = [{
            type: 'input',
            name: 'tmpdir',
            message: 'Where do you want your temporary files stored? (Directory should exist and be writable)',
            default: assetConfig.tmpdir
        },{
            type: 'checkbox',
            name: 'engines',
            message: 'Which asset storage engines would you like to configure?',
            choices: ['Local', 'Amazon S3']
        }],
        deferred = q.defer();

    logger.statement('');
    logger.statement('Configuring Asset Engines...');
    baseConfig();

    return deferred.promise;

    function baseConfig(){
        inquirer.prompt(questions, function( answers ) {
            directoryExistsAndWritable(answers.tmpdir).then(
                function(){
                    var promises = [];

                    assetConfig.tmpdir = answers.tmpdir;

                    _.each(answers.engines, function(engine){
                        if(engine === 'Local'){
                            promises.push(configureLocalAssetEngine);
                        }
                        else if(engine === 'Amazon S3'){
                            promises.push(configureS3AssetEngine);
                        }
                    });

                    promises.reduce(q.when, q({})).then(
                        function(engines){
                            _.merge(assetConfig, {
                                engines: engines
                            });

                            deferred.resolve(assetConfig);
                        },
                        function(err){
                            logger.error('');
                            logger.error(err.message);
                            baseConfig();
                        }
                    );
                },
                function(){
                    baseConfig();
                }
            )
                .catch(function(err){
                    console.log(err);
                });
        });
    }

    function configureLocalAssetEngine(engines){
        var questions = [{
                type: 'input',
                name: 'domain',
                message: 'What is the domain of your application?',
                default: 'http://localhost:3000'
            },{
                type: 'input',
                name: 'subfolder',
                message: 'Where on your domain would you like to access your public files?',
                default: '/assets'
            },{
                type: 'input',
                name: 'path',
                message: 'What is the absolute path on your filesystem related to this location?',
                default: path.join(config.project.home, 'app', 'public', 'assets')
            },{
                type: 'list',
                name: 'default',
                message: 'Is this the default asset engine for this project?',
                choices: ['Yes', 'No']
            }],
            deferred = q.defer();

        logger.statement('');
        logger.statement('Configure Local Asset Engine:');

        assetPrompt();

        return deferred.promise;

        function assetPrompt(){
            inquirer.prompt(questions, function( answers ) {
                directoryExistsAndWritable(answers.path).then(
                    function(){
                        if(answers.default === 'Yes'){
                            assetConfig.default = 'local';
                        }

                        _.merge(engines, {
                            local: {
                                path: answers.path,
                                urlbase: answers.domain + answers.subfolder
                            }
                        });

                        deferred.resolve(engines);
                    },
                    function(){
                        assetPrompt();
                    }
                );
            });
        }
    }

    function configureS3AssetEngine(engines){
        var questions = [{
                type: 'input',
                name: 'accessKeyId',
                message: 'What is your `accessKey`?'
            },{
                type: 'input',
                name: 'secretAccessKey',
                message: 'What is your `secretAccessKey`?'
            },{
                type: 'list',
                name: 'region',
                message: 'What is your bucket\'s `region`?',
                choices: ['us-east-1', 'us-west-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1'],
                default: 'us-east-1'
            },{
                type: 'input',
                name: 'bucket',
                message: 'What is your `bucket` name?',
                choices: ['Yes', 'No']
            },{
                type: 'input',
                name: 'urlbase',
                message: 'What is the base URL that will serve these assets?'
            },{
                type: 'list',
                name: 'default',
                message: 'Is this the default asset engine for this project?',
                choices: ['Yes', 'No']
            }],
            deferred = q.defer();

        logger.statement('');
        logger.statement('Configure Amazon S3 Asset Engine:');

        inquirer.prompt(questions, function( answers ) {
            if(answers.default === 'Yes'){
                assetConfig.default = 'local';
            }

            _.merge(engines, {
                amazon: {
                    accessKeyId: answers.accessKeyId,
                    secretAccessKey: answers.secretAccessKey,
                    region : answers.region,
                    bucket : answers.bucket,
                    urlbase : answers.urlbase
                }
            });

            deferred.resolve(engines);
        });

        return deferred.promise;
    }
};

function directoryExistsAndWritable(dirpath){
    var deferred = q.defer();

    fs.stat (dirpath, function (err, stats){
        if (err && err.errno === 34) {
            logger.error('The directory at path: ' + dirpath + ' could not be found.');
            logger.error('Please fix and try again.');
            deferred.reject(new Error(dirpath + ' not found'));
        }
        else {
            //Test to see if the folder is writable
            if(!!(2 & parseInt ((stats.mode & parseInt ("777", 8)).toString (8)[0]))){
                deferred.resolve();
            }
            else {
                logger.error('The directory at path: ' + dirpath + ' is not writable.');
                logger.error('Please fix and try again.');
                deferred.reject(new Error(dirpath + ' not writable'));
            }
        }
    });

    return deferred.promise;
}