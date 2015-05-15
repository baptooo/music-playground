'use strict';

module.exports = function (grunt) {
  grunt.registerTask('serve', [
      'connect:dev',
      'ngconstant:local',
      'build',
      'watch'
    ]
  );
};
