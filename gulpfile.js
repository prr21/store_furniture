const { src, dest, series, parallel, watch, task } = require('gulp'),
 	gulp = require('gulp'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssNano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	newer = require('gulp-newer'),
	cache = require('gulp-cache');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
  done();
}
task(browserSync)

function browsersyncReload(done){
	browsersync.reload();
	done();
}

function makeSass(){
	return src('app/sass/*.sass')

	.pipe(sass())
	.pipe(gulp.dest('app/css'))
}
task(makeSass)

function makeCss(){
	return src('app/css/style.css')

  	.pipe(cssNano())
	.pipe(rename({suffix:'.min'}))
	.pipe(dest('app/css'))
	.pipe(browsersync.stream());
}
task(makeCss)

function images(){
	return src('app/img/**/*')

	.pipe(newer('app/img'))
	.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		})))
	.pipe(dest('dist/img'))
}
task(images)

function watchFiles() {
  watch("app/sass/*.sass", series(makeSass, makeCss));
  watch("app/css/style.css", makeCss);
  watch([
  	"app/*.html",
  	"app/css/*.css"
  	], browsersyncReload);
  watch("app/img/**/*", images);
}

task('default', parallel(watchFiles, browserSync));