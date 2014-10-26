'use strict';

module.exports = function(grunt) {
  grunt.config.set('sass', {
    dev: {
      options: {
        sourcemap: true,
        loadPath: ['bower_components/bootstrap-sass/lib', './']
      },
      files: {
        'src/css/music-playground.min.css': 'src/sass/main.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};