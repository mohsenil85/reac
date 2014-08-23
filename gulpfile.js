var gulp = require('gulp');
var watchify = require('gulp-watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require("gulp-uglify");
var nodemon = require("gulp-nodemon");
var buffer = require('vinyl-buffer');

var bundlePaths = {
  js: [
    './public/js/**/*.js'
  ],
  jsMain: './public/js/app.js',
  index: './public/index.html',
  dest:'./target'
};

var watching = false;
gulp.task('enable-watch-mode', function() { watching = true; });

gulp.task('js-min', function(){
    browserify(bundlePaths.jsMain)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./target'));
});


gulp.task('index', function(){
    return gulp.src(bundlePaths.index)
    .pipe(gulp.dest('./target'));
});

gulp.task('browserify', watchify(function(watchify) {
  return gulp.src(bundlePaths.js)
  .pipe(watchify({
    watch:watching
  }))
  .pipe(gulp.dest(bundlePaths.dest));
}));

gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('watch', ['watchify', 'index'], function () {
  nodemon({
    script: 'index.js'
  });
});

gulp.task('compile', ['js-min', 'index',]);
