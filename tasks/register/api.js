'use strict';

module.exports = function(grunt) {
  grunt.registerTask('api', [
    'clean:api',
    'parseApi'
  ])
};