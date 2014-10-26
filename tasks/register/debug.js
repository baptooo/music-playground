'use strict';

module.exports = function(grunt) {
  grunt.registerTask('debug', [
    'sass:dev',
    'watch'
  ]);
};