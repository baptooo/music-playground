'use strict';

module.exports = function(grunt) {
  grunt.config.set('sass', {
    dev: {
      options: {
        loadPath: ['<%= buildConfig.paths.app %>/vendor/bootstrap-sass/vendor/assets/stylesheets', './']
      },
      files: {
        '<%= buildConfig.paths.app %>/css/music-playground.min.css': '<%= buildConfig.paths.app %>/styles/main.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};