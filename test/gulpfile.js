var gulp = require('gulp');
var removeCss = require('./../index.js');

gulp.task('default', function () {
    gulp.src('data/php/style.css', {buffer: false})
        .pipe(removeCss({
            path: ['data/php/**/*.php']
        }))
        .pipe(gulp.dest('bas'));
});
