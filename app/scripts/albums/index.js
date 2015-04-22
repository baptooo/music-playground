angular.module('albums', [])
  .controller('AlbumsCtrl', require('./albums'))
  .service('albumService', require('./albumService'))
  .config(require('./config'));

module.exports = 'albums';
