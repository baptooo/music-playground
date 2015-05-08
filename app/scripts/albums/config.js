function config($stateProvider) {
  $stateProvider.state('root.artists.albums', {
    url: 'albums/:artist',
    views: {
      'albums@': {
        templateUrl: 'scripts/albums/albums.tpl.html',
        controller: 'AlbumsCtrl as albums'
      }
    },
    resolve: {
      currentArtist: function ($stateParams, artistService) {
        if ($stateParams.artist) {
          return artistService.getArtistByName($stateParams.artist);
        }
      },
      albumPromise: function ($stateParams, albumService) {
        return albumService.getAlbumsForArtist($stateParams.artist)
          .then(function (data) {
            return data;
          });
      }
    },
    onEnter: function (currentArtist, $rootScope) {
      $rootScope.currentArtist = currentArtist;
    }
  })
}

module.exports = config;
