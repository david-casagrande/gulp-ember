var gulp    = require('gulp'),
		concat  = require('gulp-concat'),
		jshint  = require('gulp-jshint'),
		nodemon = require('nodemon');

gulp.task('server', function () {
  gulp.run('compile');

  nodemon({
    script: 'server.js',
    ext: 'js json html',
    watch: 'app',
  	restartable: 'rs'
  })
  // Forward ^C to gulp
  process.on('SIGINT', function () { process.exit() });

  gulp.watch(['./app/**/*.js',], function(){
  	gulp.run('compile');
  }); 

});

gulp.task('lint', function(){
	gulp.src('./app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('compile', function(){
	gulp.src(['./app/test.js', './app/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist'));
});

