var express  = require('express');
var config   = require('../../gulpfile.js/config/server');
var gutil    = require('gulp-util');
var compress = require('compression');
var logger   = require('morgan');
var ejs   = require('ejs');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server = app
  .use(compress())
  .use(logger(config.logLevel))
  .use('/', express.static(config.root, config.staticOptions))
  .get('/game/:gameId', function(req, res){
    var gameId = req.params.gameId;

    res.render('pages/game', { 
        gameId: gameId
    });
  })
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')
  .listen(config.port)


io.listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('save link4', function(payload){
    var game = JSON.parse(payload);
    console.log('save game: ' + game.id);
    socket.broadcast.emit(game.id, payload);
  });
  socket.on('connect link4', function(payload){
    var game = JSON.parse(payload);
    console.log(payload);
    console.log('connect game: ' + game.id);
    socket.broadcast.emit(game.id, payload);
  });
});


var url = 'http://localhost:' + config.port;
gutil.log('link4 server started on ' + gutil.colors.green(url));

