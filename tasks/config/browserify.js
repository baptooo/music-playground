'use strict';

module.exports = function (grunt) {
  grunt.config.set('browserify', {
    options: {
      browserifyOptions: {
        debug: true
      }
    },
    build: {
      files: {
        '<%= buildConfig.paths.app %>/bin/main.js': ['<%= buildConfig.paths.app %>/scripts/main.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
