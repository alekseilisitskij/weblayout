const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const fileInclude = require('gulp-file-include');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

let isProd = false; // dev by default

const clean = () => {
    return del ('dist');
};

const resources = () => {
    return src('src/resourses/**')
    .pipe(dest('dist'));
};

const styles = () => {
    return src('src/css/**/*.css')
     .pipe(gulpif (!isProd, sourcemaps.init()))
     .pipe(concat('main.css'))
     .pipe(autoprefixer({
        cascade: false
     }))
     .pipe(cleanCSS({
        level: 2
     }))
     .pipe(sourcemaps.write())
     .pipe(dest('dist'))
     .pipe(browserSync.stream());
};

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'));
};

const htmlInclude = () => {
    return src(`src/**/*.html`)
      .pipe(fileInclude({
        prefix: '@',
        basepath: '@file'
      }))
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
  };

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
     .pipe(svgSprite({
        mode: {
            stack: {
                sprite:'../sprite.svg'
            }
        }
     }))
     .pipe(dest('dist/images'));
};

const scripts = () => {
    return src([
        'src/js/componets/**/*/.js',
        'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
};

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.png',
        'src/img/*.svg',
        'src/img/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/images'));
};

const toProd = (done) => {
    isProd = true;
    done();
};

watch('src/**/*.html', htmlMinify);
watch('src/**/*.html', htmlInclude);
watch('src/css/**/*.css', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, resources, htmlInclude, scripts, styles, images, svgSprites, watchFiles);
exports.prod = series(toProd, clean, resources, htmlInclude, htmlMinify, scripts, styles, images, svgSprites);