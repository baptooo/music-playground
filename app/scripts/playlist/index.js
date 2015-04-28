angular.module('playlist', [])
  .controller('PlaylistCtrl', require('./playlist'))
  .service('playlistService', require('./playlistService'));

module.exports = 'playlist';
