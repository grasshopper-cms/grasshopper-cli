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
    var deferred = q.defer();

    importData(config.db.host, 'users', require('../../sampledata/basic/users')(ObjectID)[0]).then(
        function(){
            deferred.resolve(config)
        }
    );

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