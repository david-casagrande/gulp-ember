var gulp    = require('gulp');
//using a grunt plugin until ported to Gulp
require('gulp-grunt')(gulp);

var concat     = require('gulp-concat'),
		jshint     = require('gulp-jshint'),
    handlebars = require('gulp-ember-handlebars'),
    nodemon    = require('nodemon'),
    path       = require('path'),
    preprocess = require('gulp-processhtml'),
    plumber    = require('gulp-plumber'),
    sass       = require('gulp-sass'),
    transpiler = require("gulp-es6-module-transpiler"),
    uglify     = require('gulp-uglify');

gulp.task('server', function(){
  gulp.run('source:transpile', 'source:concat', 'source:css', 'source:compile_templates', 'source:vendor');

  var port = gulp.env.port || 8000,
      env  = gulp.env.production ? 'production' : 'development';

  nodemon({
    'script': 'server.js',
    'watch': ['tmp/assets/', 'public/'],
    'ext': 'js css html',
    'env': {
      'PORT':     port,
      'NODE_ENV': env
    }
  });

  gulp.watch(['app/**/*.js'], function(){
    gulp.run('source:transpile', 'source:concat');
  });

  gulp.watch(['app/**/*.scss'], function(){
    gulp.run('source:css');
  });

  gulp.watch(['app/**/*.handlebars'], function(){
    gulp.run('source:compile_templates');
  });


});

gulp.task('lint', function(){
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('source', function(){
  gulp.run('source:transpile', 'source:concat', 'source:css', 'source:minify', 'source:compile_templates', 'source:html');
});

gulp.task('source:transpile', function(){
  var stream = gulp.src('./app/**/*.js')
    .pipe(plumber())
    .pipe(transpiler({ 
      type: 'amd', 
      moduleName: function(moduleName, file){
        return 'gulp/'+file.relative.split('.js')[0];
      } 
    }))
    .pipe(gulp.dest('./tmp/transpiled'));
    return stream;
});

gulp.task('source:concat', ['source:transpile'], function() {
  gulp.run('grunt-concat_sourcemap');
});

gulp.task('source:css', function() {
  gulp.src('app/stylesheets/application.scss')
    .pipe(plumber())
    .pipe(sass({ sourceComments: 'map' }))
    .pipe(gulp.dest('./tmp/assets'))
});

gulp.task('source:minify', ['source:transpile', 'source:concat', 'source:compile_templates'],function(){
  gulp.src(['tmp/dev/app.js', 'tmp/dev/templates.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('tmp/prod'));
});

gulp.task('source:compile_templates', function() {
  
  gulp.src('app/templates/**/*.handlebars')
    .pipe(plumber())
    .pipe(handlebars({ 
      outputType:   'amd',
      modulePrefix: 'gulp',
      templateRoot: 'gulp/templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./tmp/assets/'));
});

gulp.task('source:html', function(){
  gulp.src('./public/index.html')
    .pipe(preprocess('index.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('source:vendor', function() {
  var libs = [
    './vendor/amd-loadr/loadr.js',
    './vendor/jquery/dist/jquery.js',
    './vendor/handlebars/handlebars.js',
    './vendor/ember/ember.js',
    './vendor/ember-data/ember-data.js',
    './vendor/ember-resolver/dist/ember-resolver.js',
    './vendor/foundation/js/foundation.js'
  ];
  gulp.src(libs)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./tmp/assets/'));
});


gulp.task('test:server', function(){
  gulp.run('source');
  gulp.run('test:transpile', 'test:concat');

  var port = gulp.env.port || 8000,
      env  = gulp.env.production ? 'production' : 'development';

  nodemon({
    'script': 'server-test.js',
    'env': {
      'PORT':     port,
      'NODE_ENV': env
    }
  });

  gulp.watch(['app/**/*.js', 'app/**/*.handlebars', 'app/*.html', 'app/stylesheets/**/*.scss', 'spec/**/*.js', 'spec/index.html'], function(){
    gulp.run('source');
    gulp.run('test:transpile', 'test:concat');
  });

});

gulp.task('test:transpile', function(){
  var stream = gulp.src('./spec/**/*.js')
    .pipe(transpiler({ 
      type: 'amd', 
      moduleName: function(moduleName, file){
        return 'gulp/'+file.relative.split('.js')[0];
      } 
    }))
    .pipe(gulp.dest('./tmp/spec/transpiled'));
  return stream;
});

gulp.task('test:concat', ['test:transpile'], function(){
  gulp.src('./tmp/spec/transpiled/**/*.js')
    .pipe(concat('test.js'))
    .pipe(gulp.dest('./tmp/spec'));
});
