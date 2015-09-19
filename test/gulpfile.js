var gulp = require('gulp');
var criticalPath = require('./../index.js');
var rename = require('gulp-rename');

gulp.task('default', function () {
    return gulp.src('data/css/style.css', {buffer: false})
        .pipe(criticalPath({
            criticalClasses: '---critical'
        }))
        .pipe(rename('abc.txt'))
        .pipe(gulp.dest('bas'));
});
