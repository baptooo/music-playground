'use strict';

module.exports = function(grunt) {
  grunt.config.set('watch', {
    sass: {
      files: 'src/sass/**/*.scss',
      tasks: ['sass:dev']
    },
    js: {
      files: 'src/js/**/*.js'
    },
    html: {
      files: ['index.html', 'src/views/**/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};