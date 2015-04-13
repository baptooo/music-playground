var gulp = require('gulp'),
  userConfig = require('./userConfig.json'),
  parseApi = require('./gulp/parseApi');

gulp.task('parseApi', function () {
  gulp.src(userConfig.basePath + '/**/*.mp3')
    .pipe(parseApi())
    .pipe(gulp.dest('./api_test'));
});