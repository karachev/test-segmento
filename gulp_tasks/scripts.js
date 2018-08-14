const gulp = require("gulp");
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const errorHandler = require('gulp-plumber-error-handler');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackStream = require('webpack-stream');

gulp.task('scripts', function() {
  return gulp.src('src/js/index.js')
    .pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts:copy-mistape', function() {
  return gulp.src([
    'src/js/plugins/mistape/modernizr.js',
    'src/js/plugins/mistape/mistape.js'
  ])
    .pipe(concat('mistape.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts:copy-fileupload', function() {
  return gulp.src([
    'src/js/plugins/fileupload/jquery.ui.widget.js',
    'src/js/plugins/fileupload/jquery.fileupload.js'
  ])
    .pipe(concat('fileupload.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts:prod', () => (
  gulp.src('src/js/index.js')
    .pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('../web/build/js'))
));
