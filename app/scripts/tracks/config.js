function config($stateProvider) {
  $stateProvider.state('root.artists.albums.tracks', {
    url: '/tracks/:album',
    views: {
      'tracks@': {
        templateUrl: 'scripts/tracks/tracks.tpl.html',
        controller: 'TracksCtrl as tracks'
      }
    },
    resolve: {
      currentAlbum: function ($stateParams, albumService) {
        if ($stateParams.album) {
          return albumService.getAlbumByName($stateParams.album, $stateParams.artist);
        }
      },
      tracksPromise: function ($stateParams, trackService) {
        return trackService.getTracksForAlbum($stateParams.album)
          .then(function (data) {
            return data;
          });
      }
    },
    onEnter: function (currentAlbum, $rootScope) {
      $rootScope.currentAlbum = currentAlbum;
    }
  });
}

module.exports = config;
