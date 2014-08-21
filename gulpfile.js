var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");
var rimraf = require("gulp-rimraf");

var buffer = require('vinyl-buffer');

var public = './public'
var scriptsDir = './public/js';
var buildDir = './target';

gulp.task('index', function(){
    return gulp.src('./public/index.html')
    .pipe(gulp.dest('./target'))

})
gulp.task('clean', function(){
    return gulp.src(buildDir, {read: false})
    .pipe(rimraf());
});

gulp.task('js', function(){
    browserify('./public/js/app.js')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./target'))
});
gulp.task('default', [
    'clean',
    'index',
    'js'
]);
