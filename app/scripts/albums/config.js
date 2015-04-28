function config($stateProvider) {
  $stateProvider.state('artists.albums', {
    url: 'albums/:artist',
    templateUrl: 'scripts/albums/albums.tpl.html',
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
    },
    controller: 'AlbumsCtrl as albums'
  })
}

module.exports = config;
