const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    -- TOP LEVEL FUNCTIONS


*/ 

gulp.task('message', () => console.log('Gulp is running...'))


// Copy all html files
gulp.task('copyHtml', () => 
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
);

//Optimize Images
gulp.task('imageMin', () => 
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
)


//Compile Sass
gulp.task('sass', () =>
    gulp.src('src/sass/*scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
)

//Concat and minify JS files
gulp.task('scripts', () =>
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
)

gulp.task('default', gulp.parallel(['message', 'copyHtml', 'imageMin', 'scripts']))

gulp.task('watch', () => {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});