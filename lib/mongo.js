'use strict';

var MongoClient = require('mongodb').MongoClient,
    q = require('q');

module.exports = function(url) {
    return {
        buildConfig: buildConfig,
        testConnection: testConnection
    };

    function buildConfig(){
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

    function testConnection(){
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
};