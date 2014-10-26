'use strict';

module.exports = function(grunt) {
  grunt.registerTask('serve', [
      'connect:dev',
      'sass:dev',
      'watch'
    ]
  );
};