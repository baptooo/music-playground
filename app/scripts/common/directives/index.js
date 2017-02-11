angular.module('common.directives', [])
  .directive('returnTop', require('./returnTop'))
  .directive('albumPicture', require('./albumPicture'));

module.exports = 'common.directives';
