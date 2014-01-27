var gulp    = require('gulp');
//using a grunt plugin until ported to Gulp
require('gulp-grunt')(gulp);

var concat     = require('gulp-concat'),
    jade       = require('gulp-jade'),
		jshint     = require('gulp-jshint'),
    handlebars = require('../../ember/gulp-ember-handlebars'),
    nodemon    = require('gulp-nodemon'),
    path       = require('path'),
    preprocess = require('gulp-processhtml'),
    sass       = require('gulp-sass'),
    transpiler = require("gulp-es6-module-transpiler"),
    uglify     = require('gulp-uglify');

gulp.task('server', function(){
  gulp.run('source');
  nodemon({ script: 'server-proxy.js', options: '-e js,html --watch tmp' });

  gulp.watch(['app/**/*.js', 'app/**/*.handlebars', 'app/*.jade', 'app/*.html', 'app/stylesheets/**/*.scss'], function(){
    gulp.run('source');
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
  gulp.src('app/stylesheets/**/*scss')
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./tmp/dev'))
});

gulp.task('source:minify', ['source:transpile', 'source:concat', 'source:compile_templates'],function(){
  gulp.src(['tmp/dev/app.js', 'tmp/dev/templates.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('tmp/prod'));
});

gulp.task('source:comp', function(){
  gulp.run('grunt-emberTemplates');
});

gulp.task('source:compile_templates', function() {
  
  gulp.src('app/templates/**/*.handlebars')
    .pipe(handlebars({ 
      outputType:   'amd',
      modulePrefix: 'gulp'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('tmp/dev/'));
});

gulp.task('source:html', function(){
  gulp.src('app/index.html')
    .pipe(preprocess('index.html'))
    .pipe(gulp.dest('tmp/dev'));
});

gulp.task('source:jade', function(){
  gulp.src('app/index.jade')
    .pipe(jade({ data: { env: 'dev' } }))
    .pipe(gulp.dest('tmp/dev'));

  gulp.src('app/index.jade')
    .pipe(jade({ data: { env: 'production' } }))
    .pipe(gulp.dest('tmp/prod'));  
});
