'use strict';

var gulp = require("gulp"),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    wiredep = require('wiredep').stream,
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync');

//build
var rimraf = require('gulp-rimraf'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css');

var paths = {
    watchFiles: ['app/*.html', 'app/js/**/*.js', 'app/less/*.less'],
    lessMain: 'app/less/main.less',
    css: 'app/css/',
    lessDest: 'app/less/*.less',
    htmlDest: 'app/*.html',
    appDest: 'app/',
    distDest: 'dist',
    jqueryPlaceholder: 'app/bower/jquery-placeholder/jquery.placeholder.js',
    html5shiv: "app/bower/html5shiv/dist/html5shiv.js",
    appFonts: 'app/fonts/*',
    distFonts: 'dist/fonts/',
    appImgs: 'app/img/**/*',
    distImgs: 'dist/img'
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


//build
gulp.task('useref', function () {
    return gulp.src(paths.htmlDest)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest(paths.distDest));
});

gulp.task('clean', function() {
    return gulp.src(paths.distDest, { read: false })
        .pipe(rimraf());
});

gulp.task('fonts', function() {
    gulp.src(paths.appFonts)
        .pipe(gulp.dest(paths.distFonts))
});

gulp.task('images', function () {
    return gulp.src(paths.appImgs)
        .pipe(gulp.dest(paths.distImgs));
});

gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ]).pipe(gulp.dest(paths.distDest));
});

gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*');
});

gulp.task('build', ['clean'], function () {
    gulp.start('dist');
});

