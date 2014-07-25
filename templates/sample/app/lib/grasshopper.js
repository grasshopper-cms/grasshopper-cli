'use strict';

var api = require('grasshopper-api'),
    grasshopper = api('use proxy'),
    core;

var gh = {
    router: grasshopper.router
}

Object.defineProperty(gh, "core", {
    get: function() { return core; }
});

grasshopper.core.event.channel('/system/db').on('start', function(payload, next){
    grasshopper.core.auth('basic', { username: 'admin', password: 'TestPassword' }).then(function(token) {
        core = grasshopper.core.request(token);
        next();
    });
});

module.exports = gh;