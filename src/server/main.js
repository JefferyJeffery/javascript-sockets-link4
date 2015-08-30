var express  = require('express');
var config   = require('../../gulpfile.js/config/server');
var gutil    = require('gulp-util');
var compress = require('compression');
var logger   = require('morgan');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server = app
  .use(compress())
  .use(logger(config.logLevel))
  .use('/', express.static(config.root, config.staticOptions))
  .listen(config.port)

io.listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
});

var url = 'http://localhost:' + config.port;
gutil.log('link4 server started on ' + gutil.colors.green(url));

//open(url);

