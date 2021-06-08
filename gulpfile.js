const sass = require('gulp-sass');
const {series,dest,src,watch} = require('gulp');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const notify = require('gulp-notify');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*'
}

function css(){
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest('./build/css'))
}

function minificarCss(){
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
}

function js(){
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/js'))
}

function imagenes(){
    return src(paths.img)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Imagen Minificada'}));
}

function versionWebp(){
    return src(paths.img)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message: 'Version Webp'}));
}

function watchArchivos(){
    watch(paths.js, js);
    watch(paths.scss, css);
}

exports.css = css;
exports.js = js;
exports.minificarCss = minificarCss;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.watchArchivos = watchArchivos;
exports.default = series(imagenes,versionWebp,css,js,watchArchivos);