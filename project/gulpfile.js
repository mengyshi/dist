var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");

gulp.task("sass",function(){
	return gulp.src(["*.scss","login/sass/*.scss"])
	.pipe(sourcemaps.init())
	.pipe(sass({"outputStyle":"compact"}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("copyImg",function(){
	return gulp.src("img/**/*")
	.pipe(gulp.dest("dist/img"))
	.pipe(connect.reload());
})
gulp.task("copyHtml",function(){
	return gulp.src(["login/*.html","*.html"])
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

gulp.task("copyData",function(){
	return gulp.src(["json/*.json"]).pipe(gulp.dest("dist/data")).pipe(connect.reload());
})
gulp.task("uglify",function(){
	return gulp.src(["*.js","login/js/*.js","!gulpfile.js"]).pipe(babel({"presets":["es2015"]})).pipe(uglify()).pipe(gulp.dest("dist/js")).pipe(connect.reload());
})
gulp.task("watch",function(){
	gulp.watch(["*.scss","login/sass/*.scss"],["sass"]);
	gulp.watch(["*.js","login/js/*.js","!gulpfile.js"],["uglify"]);
	gulp.watch(["login/*.html","*.html"],["copyHtml"]);
	gulp.watch("json/*.json",["copyData"]);
	gulp.watch("img/**/*",["copyImg"]);
	
})
gulp.task("build",["sass","copyImg","copyData","copyHtml","uglify"]);
/*gulp.task("server",function(){
	connect.server({root:"dist",livereload:true;});
	
	
})*/
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true 
	})
})

gulp.task("default",["server","watch"]);
