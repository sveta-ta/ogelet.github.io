// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');

// Get one .styl file and render
gulp.task('styles', function () {
	gulp.src('./stylus/main.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./css'));
});

gulp.task('gulp-watch', function(){
  gulp.watch('**/*.styl', ['styles'])
});
