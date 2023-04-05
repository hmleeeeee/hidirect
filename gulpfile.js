'use strict';

/**
 * Gulp Setting
 * --------------------------------------
 * #기본 설치
 * 	1. node.js 설치	(LTS) 			- https://nodejs.org/
 * 	2. Git Bash 설치 						- https://git-scm.com/downloads
 * --------------------------------------
 * #모듈 설치
 * 	모듈 : $ npm install
 * 	전역 : $ npm i -g gulp
 * 	전역 : $ npm i -g sass
 * 	시작 : $ gulp
 * 	종료 : Ctrl + c
 * --------------------------------------
**/

//Gulp Module
const gulp = require('gulp');

//Sass Module
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');

//JS Module
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

//Server Module
const browserSync = require('browser-sync');


/**
 * CONFIG
 * --------------------------------------
 */
const CONFIG = {
	PC : {
		HTML : {
			DEST : './webApp/PC/**/*.html'
		}
		, SASS : {
			SRC : './webApp/PC/resources/scss/**/*.scss'
			, DEST1 : './webApp/PC/resources/css' 
			, OPTION : {
				outputStyle: 'compressed'
			}
		}
		, SERVER : {
			port : 3999
			, server : {baseDir : './webApp/'}
			// , browser: ['Google Chrome']//Mac OS
			, browser: ['Chrome']//window OS
			, watch : true
		}
	}
	, MO : {
		HTML : {
			DEST : './webApp/MO/**/*.html'
		}
		,SASS : {
			SRC : './webApp/MO/resources/scss/**/*.scss'
			, DEST1 : './webApp/MO/resources/css' 
			, OPTION : {
				outputStyle: 'compressed'
			}
		}
	}
}


/**
* Project
* --------------------------------------
*/
//[PC.SASS]
gulp.task( 'SCSS:PC', () => {
	return new Promise( resolve => {
		gulp.src(CONFIG.PC.SASS.SRC)
			.pipe(sourcemaps.init())
			.pipe(sass.sync(CONFIG.PC.SASS.OPTION ).on('error', sass.logError))
			.pipe(sourcemaps.write('./') )
			.pipe(gulp.dest(CONFIG.PC.SASS.DEST1))
		;
		resolve();
	});
});

//[MO.SASS]
gulp.task( 'SCSS:MO', () => {
	return new Promise( resolve => {
		gulp.src(CONFIG.MO.SASS.SRC)
			// .pipe(rename({ suffix: '.min' }))
			.pipe(sourcemaps.init())
			.pipe(sass.sync(CONFIG.MO.SASS.OPTION ).on('error', sass.logError))
			.pipe(sourcemaps.write('./') )
			.pipe(gulp.dest(CONFIG.MO.SASS.DEST1))
		;
		resolve();
	});
});

//[SERVER]
gulp.task('SERVER', () => {
	return new Promise( resolve => {
			browserSync.init( null, CONFIG.PC.SERVER);//PC Server 동일사용
			gulp.watch(CONFIG.PC.HTML.DEST).on("change", browserSync.reload);
			gulp.watch(CONFIG.PC.SASS.SRC, gulp.series(['SCSS:PC']));
			gulp.watch(CONFIG.MO.HTML.DEST).on("change", browserSync.reload);
			gulp.watch(CONFIG.MO.SASS.SRC, gulp.series(['SCSS:MO']));
			resolve();
	});
});

gulp.task('SERVER:PC', () => {
	return new Promise( resolve => {
			browserSync.init( null, CONFIG.PC.SERVER);
			gulp.watch(CONFIG.PC.HTML.DEST).on("change", browserSync.reload);
			gulp.watch(CONFIG.PC.SASS.SRC, gulp.series(['SCSS:PC']));
			resolve();
	});
});

gulp.task('SERVER:MO', () => {
	return new Promise( resolve => {
			browserSync.init( null, CONFIG.PC.SERVER);//PC Server 동일사용
			gulp.watch(CONFIG.MO.HTML.DEST).on("change", browserSync.reload);
			gulp.watch(CONFIG.MO.SASS.SRC, gulp.series(['SCSS:MO']));
			resolve();
	});
});


//@@ project
gulp.task( 'default', gulp.series(['SCSS:PC', 'SCSS:MO', 'SERVER'])); //All
gulp.task( 'pc', gulp.series(['SCSS:PC', 'SERVER'])); //pc
gulp.task( 'mo', gulp.series(['SCSS:MO', 'SERVER'])); //MO
