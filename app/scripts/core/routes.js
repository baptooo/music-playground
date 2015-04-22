module.exports = function ($stateProvider, $urlRouterProvider) {
  // Default Route is home
  $urlRouterProvider.otherwise('/');

  // Route configuration
  $stateProvider
    .state('artists.albums.tracks.listen', {
      url: '/listen/:track',
      resolve: {
        currentTrack: function($stateParams, trackService) {
          return trackService.getTracksForAlbum($stateParams.album)
            .then(function() {
              return trackService.getTrackByLabel($stateParams.track);
            });
        }
      },
      onEnter: function(currentTrack, $rootScope) {
        $rootScope.currentTrack = currentTrack;
      },
      controller: function ($rootScope, currentTrack, trackService) {
        $rootScope.deepLinkTrack = true;
        trackService.setCurrentTrack(currentTrack);
      }
    })
};
