'use strict';

module.exports = function (grunt) {
  grunt.config.set('browserify', {
    build: {
      files: {
        '<%= buildConfig.paths.app %>/bin/main.js': ['<%= buildConfig.paths.app %>/scripts/main.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
