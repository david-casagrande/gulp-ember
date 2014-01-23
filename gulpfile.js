var gulp    = require('gulp');
//using a grunt plugin until ported to Gulp
require('gulp-grunt')(gulp);

var concat     = require('gulp-concat'),
    jade       = require('gulp-jade'),
		jshint     = require('gulp-jshint'),
    nodemon    = require('gulp-nodemon'),
    transpiler = require("gulp-es6-module-transpiler"),
    uglify     = require('gulp-uglify');

gulp.task('server', function(){
  gulp.run('source');
  nodemon({ script: 'server.js', options: '-e js,html --watch tmp' });

  gulp.watch(['app/**/*.js', 'app/**/*.handlebars', 'app/*.jade'], function(){
    gulp.run('source');
  });

});

gulp.task('lint', function(){
  gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('source', function(){
  gulp.run('source:transpile', 'source:concat', 'source:minify', 'source:compile_templates', 'source:html');
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

gulp.task('source:minify', ['source:transpile', 'source:concat', 'source:compile_templates'],function(){
  gulp.src(['tmp/dev/app.js', 'tmp/dev/templates.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('tmp/prod'));
});

gulp.task('source:compile_templates', function() {
    gulp.run('grunt-ember_handlebars');
});

gulp.task('source:html', function(){
  gulp.src('app/index.jade')
    .pipe(jade({ data: { env: 'dev' } }))
    .pipe(gulp.dest('tmp/dev'));

  gulp.src('app/index.jade')
    .pipe(jade({ data: { env: 'production' } }))
    .pipe(gulp.dest('tmp/prod'));  
});
