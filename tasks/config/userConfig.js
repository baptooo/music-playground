'use strict';

module.exports = function (grunt) {
  var userConfigPath = 'userConfig.json';

  if (!grunt.file.exists(userConfigPath)) {
    grunt.fail.fatal('You must create the userConfig.json file at the root, see https://github.com/baptooo/music-playground doc for more information');
  }

  grunt.config.set('userConfig', grunt.file.readJSON(userConfigPath));
};