angular.module('common.directives', [])
  .directive('audioPlayer', require('./audioPlayer'))
  .directive('returnTop', require('./returnTop'))
  .directive('albumPicture', require('./albumPicture'));

module.exports = 'common.directives';
