'use strict';

module.exports = function (grunt) {
  grunt.config.set('ngconstant', {
    options: {
      name: 'constants',
      dest: 'app/scripts/core/constants.js'
    },
    local: {
      options: {
        constants: {
          config: grunt.file.readJSON('app/config/local.json')
        },
        values: {
          debug: true
        }
      }
    },
    dev: {
      options: {
        constants: {
          config: grunt.file.readJSON('app/config/dev.json')
        },
        values: {
          debug: true
        }
      }
    },
    dist: {
      // TODO
    }
  });

  grunt.loadNpmTasks('grunt-ng-constant');
};
