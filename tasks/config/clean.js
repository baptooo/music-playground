'use strict';

module.exports = function(grunt) {
  grunt.config.set('clean', {
    api: ['api']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};