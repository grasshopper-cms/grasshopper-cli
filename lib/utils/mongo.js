'use strict';

var q = require('q'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    logger = require('./logger');

module.exports = {
    buildConfig: buildConfig,
    testConnection: testConnection,
    createSampleData: createSampleData
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


function createSampleData(config){
    var deferred = q.defer(),
        collections = [save('users'), save('contenttypes'), save('nodes'), save('content')];

    collections.reduce(q.when, q({})).then(
        function(){
            deferred.resolve(config)
        },
        function(err){
            logger.error('');
            logger.error(err.message);
            deferred.reject(err);
        }
    );

    function save(colName){
        var deferred = q.defer(),
            items = require('../../sampledata/basic/' + colName)(ObjectID),
            instances = [];

        items.forEach(function(item){
            instances.push(commit(item));
        });

        instances.reduce(q.when, q({})).then(
            function(){
                deferred.resolve()
            },
            function(err){
                logger.error('');
                logger.error(err.message);
                deferred.reject(err);
            }
        );

        return deferred.promise;

        function commit(obj) {
            return function(){
                var def = q.defer();

                importData(config.db.host, colName, obj).then(
                    function(){
                        def.resolve();
                    }
                );

                return def.promise;
            };
        }
    }


    return deferred.promise;
}

function importData(host, col, obj){
    var deferred = q.defer();

    MongoClient.connect(host, function(err, db) {
        if (err) logger.error(err.message);
        db.collection(col, function(err, collection){
            if (err) logger.error(err.message);
            collection.insert(obj, function(err){
                if (err) logger.error(err.message);
                db.close();
                deferred.resolve();
            });
        });
    });

    return deferred.promise;
}