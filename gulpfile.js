'use strict';

var gulp = require("gulp"),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    wiredep = require('wiredep').stream,
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync');

var paths = {
    watchFiles: ['app/*.html', 'app/js/**/*.js', 'app/less/*.less'],
    lessMain: 'app/less/main.less',
    css: 'app/css/',
    lessDest: 'app/less/*.less',
    htmlDest: 'app/*.html',
    appDest: 'app/',
    jqueryPlaceholder: 'app/bower/jquery-placeholder/jquery.placeholder.js',
    html5shiv: "app/bower/html5shiv/dist/html5shiv.js"
};


gulp.task('server', function () {
    browserSync({ 
        port: 9000, 
        server: { baseDir: 'app' } 
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.watchFiles).on('change', browserSync.reload);
    gulp.watch(paths.lessDest, ['build-less']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('default', ['server', 'watch']);


gulp.task('build-less', function(){
    return gulp.src(paths.lessMain)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css));
});

gulp.task('bower', function () {
    gulp.src(paths.htmlDest)
        .pipe(wiredep({
            exclude: [paths.jqueryPlaceholder, paths.html5shiv]
        }))
        .pipe(gulp.dest(paths.appDest));
});