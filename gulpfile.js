const {src, dest, watch, series} = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    //compile sass
    // 1. Identify file
    // 2. Compile file
    // 3. Save the .css file
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));

    done();
}

function images() {
    return src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
}

function versionWebp() {
    //optional to reduce quality of images and save some space
    /*
    const options = {
        quality: 50
    }
    */
    return src('src/img/**/*.{png,jpg}')
            .pipe(webp())
            .pipe(dest('build/img'));
}

function versionAvif() {
    return src('src/img/**/*.{png,jpg}')
            .pipe(avif())
            .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
    // watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(images, versionWebp, versionAvif, css, dev);