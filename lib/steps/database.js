'use strict';

var q = require('q'),
    _ = require('lodash'),
    Mongo = require('../mongo'),
    logger = require('../logger'),
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
            var db = new Mongo(answers.mongoUrl);

            if( answers.mongoUrl  === '') {
                logger.error('');
                logger.error('Database `URL`(mongodb://[username:password@]host1[:port1]) is required. Please try again.');
                configDb();
            }
            else {
                db.testConnection().then(
                    function(){
                        var confObj = _.merge(config, { db: db.buildConfig() });

                        if(answers.mongoSampleData === 'Yes'){
                            db.createSampleData().then(
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

