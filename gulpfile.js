
// --------------------------------------------------
// Require                               
// --------------------------------------------------

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber'),
    notifier    = require('node-notifier'),
    htmlhint    = require('gulp-htmlhint'),
    browserSync = require('browser-sync').create();


// --------------------------------------------------
// Error handler                                  
// --------------------------------------------------

var onError = function(err) {
	notifier.notify({
		title: err.plugin.substring(5), 
		message: err.message,
		icon: __dirname+'/gulp-logo.png',
		time: 5000
	});
	this.emit('end');
};


// --------------------------------------------------
// Compile sass into CSS & auto-inject into browsers
// --------------------------------------------------

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
    	.pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});


// --------------------------------------------------
// HTMLhinting and browser refresh
// --------------------------------------------------

gulp.task('html', function() {
	return gulp.src("./src/*.html")
		.pipe(plumber({errorHandler: onError}))
    	.pipe(htmlhint())
    	.pipe(htmlhint.failReporter())
        .pipe(gulp.dest('build/'))
    	.pipe(browserSync.stream());
});


// --------------------------------------------------
// Copy image files
// --------------------------------------------------

gulp.task('img', function(){
  gulp.src('src/img/*')
      .pipe(gulp.dest('build/img/'));
});


// --------------------------------------------------
// Static Server + watching scss/html files
// --------------------------------------------------

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/img/*", ['img']);
});

// --------------------------------------------------
// Default task
// --------------------------------------------------
// 
gulp.task('default', ['sass', 'html', 'serve']);