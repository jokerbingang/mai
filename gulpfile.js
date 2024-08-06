const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

const paths = {
    styles: {
        src: '*.css',
        dest: '/'
    },
    scripts: {
        src: '*.js',
        dest: '/'
    },
    images: {
        src: '*',
        dest: '/'
    },
    html: {
        src: '*.html',
        dest: '/'
    }
};

function clean() {
    return del(['dist']);
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.html.src, html);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images, html), watch);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.html = html;
exports.watch = watch;
exports.build = build;