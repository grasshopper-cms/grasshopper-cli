'use strict';

var express = require('express'),
    app = express(),
    api = require('grasshopper-api'),
    grasshopper = api('use proxy'),
    PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(grasshopper.ghApi);

app.listen(PORT);