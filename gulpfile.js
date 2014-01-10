var gulp    = require('gulp'),
		jshint  = require('gulp-jshint'),
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

gulp.task('lint', function(){
	gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
