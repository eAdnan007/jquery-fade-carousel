var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');

gulp.task('default', function (cb) {
    pump([
            gulp.src('dist/jquery.fadeCarousel.js'),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest('dist')
        ],
        cb
    );
});