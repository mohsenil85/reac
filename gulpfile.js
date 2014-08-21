var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");

var buffer = require('vinyl-buffer');

var scriptsDir = './public/js';
var buildDir = './target';


gulp.task('default', function(){
    browserify('./public/js/commentBox.js')
      .transform(reactify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./target'))
});
