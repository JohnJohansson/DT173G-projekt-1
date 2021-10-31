//vars that are used for the gulp stuff
const {
    src, dest, parallel, series, watch //functions of gulp: 
    //src=sourch map, 
    // dest= destionation map, 
    // paralell = tranfers files at the same time, 
    // series= transfer files after each other in a que
    // watch check for updates in sourch files
} = require('gulp'); //the gulp functions requiere gulp

const babel = require("gulp-babel");

// we use concat to add our files togheter
const conCat = require('gulp-concat')

// terser is for minimizing our js files
const terser = require('gulp-terser');

//cssnano is for minimizing css files
const cssnano = require('gulp-cssnano');

// we are using imagemin to minimize the images
const imagemin = require('gulp-imagemin');

// Browser sync to update the browser automaticly kinda like live server
const browserSync = require('browser-sync').create();

// sass
const sass = require('gulp-sass')(require('sass'));


// sökvägar 

// decided the sourch path and copies all * files with an ending of *.html, *.css and so on 
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imgPath: "src/img/*",
    sassPath: "src/scss/*.scss"

}

function sassTask() {
    return src(files.sassPath)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest("pub/css"));
}
// HTML-task, kopiera html

function copyHTML() {
    //sends back our html files
    return src(files.htmlPath)
        // sends them through the pipe to a map named pub
        .pipe(dest('pub'));
}

// CSS-task, copys css files

function cssTask() {
    return src(files.cssPath)
        //conCat put the files togheter into a file with the name main.css
        .pipe(conCat('main.css'))
        .pipe(cssnano())
        .pipe(dest('pub/css'));
}

// Javascript task, copy js files

function jsTask() {
    return src(files.jsPath)
        .pipe(babel())
        .pipe(conCat('main.js'))
        //terser minifies the files after concat put them togheter
        .pipe(terser())
        .pipe(dest('pub/js'));
}

// Image task, copy js files

function imageTask() {
    return src(files.imgPath)
        .pipe(imagemin())
        .pipe(dest('pub/img'));
}

// Watch-task
// A listener that detects updates on sourch files
function watchTask() {
    // wich files to watch, since there are more then one we make an array
    //then we tell it what to do with them.

    // added a init for browser syncs live server
    browserSync.init({
        server: "./pub"
    });
    watch([files.htmlPath, files.cssPath, files.jsPath, files.imgPath, files.sassPath], parallel(copyHTML, cssTask, jsTask, imageTask, sassTask)).on('change', browserSync.reload);
}



// exports.default = copyHTML; this is for just one
// with parallel we can send them all paralell to each other, we must export a function for it to work
// exports.default = parallel(copyHTML, cssTask, jsTask, imageTask);
// for the watch to work we need to do a series, so first we make the export a series then we do the parallel
//  then we run the watch
exports.default = series(
    parallel(copyHTML, cssTask, jsTask, imageTask, sassTask),
    watchTask
);

