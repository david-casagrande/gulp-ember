var gulp    = require('gulp'),
		nodemon = require('nodemon');

gulp.task('server', function () {
  
  nodemon({
    script: 'server.js',
    ext: 'js json html',
    watch: 'app',
  	restartable: 'rs'
  })
  // Forward ^C to gulp
  process.on('SIGINT', function () { process.exit() });
  
});