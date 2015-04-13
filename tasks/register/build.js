'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:build',
    'sass:dev',
    'browserify:build'
  ]);
};