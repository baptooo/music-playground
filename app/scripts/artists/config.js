function config($stateProvider) {
  $stateProvider.state('artists', {
    url: '/',
    templateUrl: 'scripts/artists/artists.tpl.html',
    resolve: {
      artistPromise: function (artistService) {
        return artistService.getArtists()
          .then(function (data) {
            return data;
          });
      }
    },
    controller: 'ArtistsCtrl as artists'
  })
}

module.exports = config;
