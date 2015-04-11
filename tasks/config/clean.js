'use strict';

module.exports = function(grunt) {
  grunt.config.set('clean', {
    api: ['api'],
    build: [
      '<%= buildConfig.paths.app %>/bin',
      '<%= buildConfig.paths.app %>/css'
    ]
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};