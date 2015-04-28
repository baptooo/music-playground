angular.module('common.directives', [])
  .directive('audioPlayer', require('./audioPlayer'))
  .directive('returnTop', require('./returnTop'));

module.exports = 'common.directives';
