'use strict';

module.exports = function(grunt) {
  grunt.registerTask('release', [
    'build',
    'version'
  ]);
};