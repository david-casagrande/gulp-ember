var gulp    = require('gulp');

var concat     = require('gulp-concat-sourcemap'),
		jshint     = require('gulp-jshint'),
    handlebars = require('gulp-ember-handlebars'),
    nodemon    = require('nodemon'),
    preprocess = require('gulp-processhtml'),
    plumber    = require('gulp-plumber'),
    sass       = require('gulp-sass'),
    transpiler = require("gulp-es6-module-transpiler"),
    uglify     = require('gulp-uglify');

gulp.task('server', function(){
  gulp.run('compile', 'source:css', 'source:compile_templates', 'source:vendor');

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
    gulp.run('compile');
  });

  gulp.watch(['app/**/*.scss'], function(){
    gulp.run('source:css');
  });

  gulp.watch(['app/**/*.handlebars'], function(){
    gulp.run('source:compile_templates');
  });
});


gulp.task('compile', function(){
  gulp.src('./app/**/*.js')
    .pipe(plumber())
    .pipe(transpiler({
      type: 'amd', 
      moduleName: function(moduleName, file){
        return 'gulp/'+file.relative.split('.js')[0];
      }      
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./tmp/assets'))
});

gulp.task('source:css', function() {
  gulp.src('app/stylesheets/application.scss')
    .pipe(plumber())
    .pipe(sass({ sourceComments: 'map' }))
    .pipe(gulp.dest('./tmp/assets'))
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

gulp.task('lint', function(){
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
