function config($stateProvider) {
  $stateProvider.state('artists.albums', {
    url: 'albums/:artist',
    templateUrl: 'scripts/albums/albums.tpl.html',
    resolve: {
      albumPromise: function ($stateParams, albumService) {
        return albumService.getAlbumsForArtist($stateParams.artist)
          .then(function (data) {
            return data;
          });
      }
    },
    controller: 'AlbumsCtrl as albums'
  })
}

module.exports = config;
