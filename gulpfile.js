var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    concatCss = require('gulp-concat-css');

gulp.task('concat', function () {
    return gulp.src(['app/css/cssfiles/fonts.css', 'app/css/cssfiles/core.css', 'app/css/cssfiles/header.css', 
                     'app/css/cssfiles/layout.css', 'app/css/cssfiles/sidebar.css', 'app/css/cssfiles/section.css', 
                     'app/css/cssfiles/about.css', 'app/css/cssfiles/projects.css', 'app/css/cssfiles/feedback.css',
                     'app/css/cssfiles/footer.css', 'app/css/cssfiles/modal.css', 'app/css/cssfiles/tooltips.css'])
        .pipe(concatCss("main.css"))
        .pipe(gulp.dest('app/css'));
});

gulp.task('server', ['concat'], function () { 
    browserSync({ 
        port: 9000, 
        server: { baseDir: 'app' } 
    }); 
    gulp.watch("app/css/cssfiles/*.css", ['concat']);
});

gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/*.css'
        ]).on('change', browserSync.reload);
});

gulp.task('default', ['concat', 'server', 'watch']);