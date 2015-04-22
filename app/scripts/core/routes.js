module.exports = function ($stateProvider, $urlRouterProvider) {
  // Default Route is home
  $urlRouterProvider.otherwise('/');

  // Route configuration
  $stateProvider
    .state('artists.albums.tracks', {
      url: '/tracks/:album',
      templateUrl: 'views/tracks.html',
      resolve: {
        tracksPromise: function ($stateParams, trackService) {
          return trackService.getTracksForAlbum($stateParams.album)
            .then(function (data) {
              return data;
            });
        }
      },
      controller: 'Tracks'
    })
    .state('artists.albums.tracks.listen', {
      url: '/listen/:track',
      controller: function ($rootScope, $stateParams) {
        $rootScope.deepLinkTrack = true;
        $rootScope.currentTrackName = $stateParams.track;
      }
    })
};
