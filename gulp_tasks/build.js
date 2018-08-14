const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', () => (
  runSequence(
    'scripts', // собирает скрипты
    'scripts:copy-mistape',
    'scripts:copy-fileupload',
    'svg-icons', // собирает свг-cпрайт
    'styles:build', // собирает стили
    'styles:wysiwyg', // собирает стили для редактора
    'copy', // делает копию из папки со шрифтами, изображениями, другими файлами
    'img-optimize', // оптимизирует изображения
    'template' // собирает html
  )
));
