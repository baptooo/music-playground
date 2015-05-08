function config($stateProvider) {
  $stateProvider.state('root.artists', {
    url: '/',
    views: {
      'artists@': {
        templateUrl: 'scripts/artists/artists.tpl.html',
        controller: 'ArtistsCtrl as artists'
      },
      'player@': {
        templateUrl: 'scripts/player/player.tpl.html'
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
