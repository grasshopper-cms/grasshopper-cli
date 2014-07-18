'use strict';

var api = require('grasshopper-api'),
    grasshopper = api('use proxy'),
    core;

var gh = {
    api: grasshopper.ghApi
}

Object.defineProperty(gh, "core", {
    get: function() { return core; }
});

grasshopper.ghCore.event.channel('/system/db').on('start', function(payload, next){
    grasshopper.ghCore.auth('basic', { username: 'admin', password: 'TestPassword' }).then(function(token) {
        core = grasshopper.ghCore.request(token);
        next();
    });
});

module.exports = gh;