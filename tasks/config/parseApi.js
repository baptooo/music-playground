'use strict';

module.exports = function(grunt) {
  grunt.config.set('parseApi', {
    basePath: '<%= userConfig.basePath %>'
  });
};