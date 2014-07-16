'use strict';

var q = require('q'),
    fs = require('fs'),
    _ = require('lodash'),
    path = require('path'),
    bower = require('./bower'),
    utilsFs = require('../utils/fs'),
    logger = require('../utils/logger'),
    inquirer = require('inquirer');

module.exports = function(config){
    var adminConfig = {
            buildDirectory : path.join(config.project.home, 'app', 'public', 'admin'),
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

            bower.validate(config).then(
                function(){

                }
            );
            /*utilsFs.directoryExistsAndWritable(conf.buildDirectory)
                .then()
                .then(
                    function(){
                        writeConfig(_.merge(config, {
                            admin: conf
                        }))
                            .then(install)
                            .then(
                            function(){
                                console.log('finished');
                            },
                            function(err){
                                console.log(err);
                            }
                        )
                            .catch(function(err){
                                console.log(err);
                            });
                    },
                    function(err){
                        logger.error('');
                        logger.error(err.message);
                        baseConfig();
                    }
                )
                .catch(function(err){
                    baseConfig();
                });
*/

        });
    }

    function install(){
        var exec = require('child_process').exec,
            cmd = path.join(config.project.home, './node_modules/.bin/grasshopper build'),
            child = exec(cmd, function(err, stdout, stderr){
                if(err) {
                    console.log('exec error: ' + err);
                }
            }),
            deferred = q.defer();

        logger.trace('');
        logger.trace('RUNNING: ' + cmd);

        child.on('error', function(err){
            deferred.reject(err);
        });

        child.on('close', function(code){
            if(code === 0){
                deferred.resolve();
            }
            else {
                deferred.reject(new Error(code));
            }
        });

        return deferred.promise;
    }

    function writeConfig(config){
        console.log(path.join(__dirname, '../../templates/admin.tpl'));
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