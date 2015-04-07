var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    serve = require('gulp-serve'),
    jasmine = require('gulp-jasmine');

var connect = require('gulp-connect');
 

gulp.task('myTask', function() {
  // place code for your default task here

  console.log("Executing myTask");
});

gulp.task('connect', function () {
  connect.server({
    root: 'src/',
    port: 8080
  });
});

gulp.task('js', function(){

	 return gulp.src('src/js/*.js')
        .pipe(concat('cts-js.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('cts-js.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('jasmine', function () {
    return gulp.src('src/test/*.js')
        .pipe(jasmine());
});



 gulp.task('default', ['js', 'connect']);
