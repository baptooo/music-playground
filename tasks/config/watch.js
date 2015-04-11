'use strict';

module.exports = function(grunt) {
  grunt.config.set('watch', {
    sass: {
      files: '<%= buildConfig.paths.app %>/styles/**/*.scss',
      tasks: ['sass:dev']
    },
    js: {
      files: '<%= buildConfig.paths.app %>/scripts/**/*.js',
      tasks: ['browserify:build']
    },
    html: {
      files: ['<%= buildConfig.paths.app %>/index.html', '<%= buildConfig.paths.app %>/views/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};