var gulp     = require('gulp');
var config   = require('../config/server');
var open     = require('open');

gulp.task('server',['nodemon'], function() {
  var url = 'http://localhost:' + config.port;
  open(url);
});
