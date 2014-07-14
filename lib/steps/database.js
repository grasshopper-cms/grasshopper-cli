'use strict';

var q = require('q'),
    _ = require('lodash'),
    logger = require('../logger'),
    MongoClient = require('mongodb').MongoClient,
    inquirer = require('inquirer');

module.exports = function(config){
    var questions = [{
            type: 'input',
            name: 'mongoUrl',
            message: 'Enter the full MongoDB connection URL:'
        },{
            type: 'list',
            name: 'mongoSampleData',
            message: 'Do you want to install Grasshopper sample data? WARNING: Data will be overwritten your mongo database.',
            choices: ['Yes', 'No']
        }],
        deferred = q.defer();

    logger.statement('');
    logger.statement('Configuring MongoDB connection...');
    configDb();

    return deferred.promise;

    function configDb(){
        inquirer.prompt(questions, function( answers ) {
            if( answers.mongoUrl  === '') {
                logger.error('');
                logger.error('Database `URL`(mongodb://[username:password@]host1[:port1]) is required. Please try again.');
                configDb();
            }
            else {
                testConnection(answers.mongoUrl).then(
                    function(){
                        var confObj = _.merge(config, { db: buildConfig(answers.mongoUrl) });

                        if(answers.mongoSampleData === 'Yes'){
                            createSampleData().then(
                                function(){
                                    deferred.resolve(confObj);
                                },
                                function(err){
                                    logger.error(err.message);
                                    configDb();
                                }
                            );
                        }
                        else {
                            deferred.resolve(confObj);
                        }
                    },
                    function(err){
                        logger.error(err.message);
                        configDb();
                    }
                );
            }
        });
    }
};

function buildConfig(url){
    var cleanUrl = url.replace('mongodb://', ''),
        parts = cleanUrl.split('/'),
        dbname = parts[parts.length - 1],
        auth = { username: '', password: '' },
        authpart,
        creds;

    if(parts[0].indexOf('@') > -1) {
        authpart = parts[0].split('@');
        creds = authpart[0].split(':');
        cleanUrl = cleanUrl.replace(authpart[0] + '@', '');

        auth.username = creds[0];
        auth.password = creds[1];
    }

    return {
        host: 'mongodb://' + cleanUrl,
        name: dbname,
        username: auth.username,
        password: auth.password,
        shorthost: cleanUrl.replace('/' + dbname, '')
    };
}

function testConnection(url){
    var deferred = q.defer();

    try {
        MongoClient.connect( url , function(err, db) {
            if(err) {
                deferred.reject(err);
                return;
            }

            db.close();
            deferred.resolve(true);
        });
    }
    catch(ex){
        deferred.reject(ex);
    }

    return deferred.promise;
}

function createSampleData(){
    var deferred = q.defer();

    deferred.resolve();

    return deferred.promise;
}
