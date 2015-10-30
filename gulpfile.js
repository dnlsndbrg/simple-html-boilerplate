
// --------------------------------------------------
// Require                               
// --------------------------------------------------

var gulp        = require('gulp'),
    chalk       = require('chalk'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber'),
    notifier    = require('node-notifier'),
    html5lint   = require('gulp-html5-lint'),
    browserSync = require('browser-sync').create();


// --------------------------------------------------
// Error handler                                  
// --------------------------------------------------

var onError = function(err) {
    var title;
    var line;
    if (err.plugin === 'gulp-html5-lint') {
        title = "html";
        console.log(err)
        line = err.message.match(/\d+\:\d+/);
        if(line) { line = line[0].replace(/\:\d+/, '') }
    } else if(err.plugin === 'gulp-sass') {
        title = 'css';
        line = err.line;
    }

    console.log(chalk.bgRed.white(title) + chalk.red(' error on line: ' + line + '\n' + err.message));

	notifier.notify({
		title: title + ' error | line: ' + line, 
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
// HTML linting and browser refresh
// --------------------------------------------------

gulp.task('html', function() {
	return gulp.src("./src/*.html")
		.pipe(plumber({errorHandler: onError}))
    	.pipe(html5lint())
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
gulp.task('default', ['sass', 'html', 'img', 'serve']);