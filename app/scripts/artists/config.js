function config($stateProvider) {
  $stateProvider.state('artists', {
    url: '/',
    views: {
      'artists@': {
        templateUrl: 'scripts/artists/artists.tpl.html',
        controller: 'ArtistsCtrl as artists'
      }
    },
    resolve: {
      artistPromise: function (artistService) {
        return artistService.getArtists()
          .then(function (data) {
            return data;
          });
      }
    }
  })
}

module.exports = config;
