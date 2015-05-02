function config($stateProvider) {
  // Route configuration
  $stateProvider
    .state('artists.albums.tracks.listen', {
      url: '/listen/:track',
      resolve: {
        currentTrack: function ($stateParams, trackService) {
          return trackService.getTracksForAlbum($stateParams.album)
            .then(function () {
              return trackService.getTrackByLabel($stateParams.track);
            });
        }
      },
      onEnter: function (currentTrack, $rootScope, trackService) {
        trackService.setCurrentTrack(currentTrack);
      }
    });
}

module.exports = config;
