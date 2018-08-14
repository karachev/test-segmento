const gulp = require('gulp');
const assemble = require('assemble');
const helpers = require('handlebars-helpers');
const helperRawinclude = require('handlebars-helper-rawinclude');
const handlebarsCond = require('handlebars-cond');


const app = assemble();
const extname = require('gulp-extname');
const flatten = require('gulp-flatten');

// only register helpers once, not every time `load` is called
app.helpers(helpers());
app.helpers(helperRawinclude)
app.helpers(handlebarsCond)

// Generating HTML Pages
gulp.task('load', function(cb) {
  app.partials('./src/templates/partials/**/*.hbs');
  app.layouts('./src/templates/layouts/**/*.hbs');
  app.pages('./src/templates/pages/**/*.hbs');
  app.data(['./src/data/**/*.json']);
  cb();
});

gulp.task('assemble', ['load'], function() {
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(flatten())
    .pipe(extname())
    .pipe(gulp.dest('./build/'))
});

gulp.task('template', ['assemble']);
