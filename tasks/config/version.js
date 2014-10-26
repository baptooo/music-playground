'use strict';

module.exports = function(grunt) {
  var isMajor = grunt.option('major') ? 'major' : '',
    isMinor = grunt.option('minor') ? 'minor' : '',
    isPatch = grunt.option('patch') ? 'path': '',
    isPreRelease = grunt.option('prerelease') ? 'prerelease': '',
    mode = isMajor || isMinor || isPatch || isPreRelease || 'prerelease';

  grunt.config.set('version', {
    options: {
      pkg: 'package.json',
      release: mode
    },
    dist: {
      src: ['package.json', 'bower.json']
    }
  });
  grunt.loadNpmTasks('grunt-version');
};