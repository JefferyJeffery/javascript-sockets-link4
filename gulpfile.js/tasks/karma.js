var gulp = require('gulp');
var karma = require('karma');

var karmaTask = function(done) {

  var config = {
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  };

  var done = function(exitStatus) {
    // Karma's return status is not compatible with gulp's streams
    // See: http://stackoverflow.com/questions/26614738/issue-running-karma-task-from-gulp
    // or: https://github.com/gulpjs/gulp/issues/587 for more information
    done(exitStatus ? "There are failing unit tests" : undefined);
  }
  
  var server = new karma.Server(config, done);
  server.start();
};

gulp.task('karma', karmaTask);

module.exports = karmaTask;
