var gulp    = require('gulp'),
		concat  = require('gulp-concat'),
    jade    = require('gulp-jade'),
		jshint  = require('gulp-jshint'),
    glob    = require('glob'),
    nodemon = require('gulp-nodemon'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify');


gulp.task('server', function(){
  nodemon({ script: 'server.js', options: '-e js,html --watch app --watch dist' });

  gulp.watch(['app/**/*.js', 'app/index.jade'], function(){
    gulp.run('html');
  }); 

  gulp.watch(['app/**/*.handlebars',], function(){
    gulp.run('compile:templates');
  });

});


gulp.task('html', function() {

  glob("app/**/*.js", null, function (er, files) {
    console.log(files)
    gulp.src('app/index.jade')
      .pipe(jade({ data: { javascripts: files, env: 'development' } }))
      .pipe(gulp.dest('dist/'))
  });

});

gulp.task('compile:app', function(){
	gulp.src(['app/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('compile:html', function(){
  gulp.src(['spec/**/*.js'])
    .pipe(concat('tests.js'))
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
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});


gulp.task('lint', function(){
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//using a grunt plugin until ported to Gulp
require('gulp-grunt')(gulp);

gulp.task('compile:templates', function() {
    gulp.run('grunt-ember_handlebars');
});
