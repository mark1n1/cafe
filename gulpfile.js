const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    //compile sass
    // 1. Identify file
    // 2. Compile file
    // 3. Save the .css file
    src('src/scss/app.scss')
        .pipe(sass({}))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));

    done();
}

function dev() {
    watch('src/scss/app.scss', css);
}

exports.css = css;
exports.dev = dev;