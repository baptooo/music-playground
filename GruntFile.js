'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    buildConfig: grunt.file.readJSON('build.config.json')
  });
  grunt.loadTasks('tasks/config');
  grunt.loadTasks('tasks/register');
};