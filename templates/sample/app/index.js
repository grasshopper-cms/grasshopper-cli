'use strict';

var express = require('express'),
    app = express(),
    grasshopper = require('./lib/grasshopper'),
    PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(grasshopper.router);

require('./routes/main')(app);
app.listen(PORT);