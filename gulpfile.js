var gulp       = require('gulp'),
		concat     = require('gulp-concat'),
		jshint     = require('gulp-jshint'),
		nodemon    = require('nodemon'),
    rename     = require('rename');

gulp.task('server', function () {
  gulp.run('compile:app');
  gulp.run('compile:templates');

  nodemon({
    script: 'server.js',
    ext: 'js html',
    watch: ['app'],
  	restartable: 'rs'
  });

  // Forward ^C to gulp
  process.on('SIGINT', function () { process.exit() });

  gulp.watch(['app/**/*.js',], function(){
  	gulp.run('compile:app');
  }); 

  gulp.watch(['app/**/*.handlebars',], function(){
    gulp.run('compile:templates');
  });

});

gulp.task('test:server', function () {
  gulp.run('compile:app');
  gulp.run('compile:tests');

  nodemon({
    script: 'server-test.js',
    ext: 'js html',
    watch: ['app', 'spec'],
    restartable: 'rs'
  });
  
  // Forward ^C to gulp
  process.on('SIGINT', function () { process.exit() });

  gulp.watch(['app/**/*.js',], function(){
    gulp.run('compile:app');
  });

  gulp.watch(['spec/**/*.js'], function(event){
    gulp.run('compile:tests');
  });

});

gulp.task('lint', function(){
	gulp.src('app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('compile:app', function(){
	gulp.src(['app/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('compile:tests', function(){
  gulp.src(['spec/**/*.js'])
    .pipe(concat('tests.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify:app', function(){
  gulp.src(['dist/app.js', 'dist/templates.js'])
    .pipe(concat('app.production.js'))
    .pipe(gulp.dest('dist'));
});

//using a grunt plugin until ported to Gulp
require('gulp-grunt')(gulp);

gulp.task('compile:templates', function() {
    gulp.run('grunt-ember_handlebars');
});
