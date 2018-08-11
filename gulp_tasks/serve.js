const gulp = require('gulp');
const vss = require('vinyl-source-stream');
const vb = require('vinyl-buffer');
const fs = require('fs');
const browserSync = require('browser-sync').create();

gulp.task('serve', function () {
  
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  
  browserSync.watch("build/**/*", (event, file) => {
    if (event === 'change' && file.indexOf('.css') === -1) {
      browserSync.reload();
    }

    if (event === 'change' && file.indexOf('.css') !== -1) {
      let stream = fs.createReadStream(file);
  
      stream
        .pipe(vss(file))
        .pipe(vb())
        .pipe(browserSync.stream());
    }
  })
});
