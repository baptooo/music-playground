module.exports = function ($scope, tracksPromise, albumPromise, trackService, playlistService, $rootScope, $stateParams, $location) {
  $scope.tracks = tracksPromise;

  $scope.playSong = function (track) {
    trackService.setCurrentTrack(track);
    playlistService.addTrack(track);
    $location.path(trackService.getTrackRoute(track));
  };

  $scope.addToPlaylist = function (track) {
    playlistService.addTrack(track);
  };

  $rootScope.$watch('currentTrackName', function (value) {
    var tracksLen = $scope.tracks.length;
    if (!value || !tracksLen) {
      return true;
    }
    for (var i = 0; i < tracksLen; i++) {
      var track = $scope.tracks[i];
      if (track.label == value) {
        trackService.setCurrentTrack(track);
        if ($rootScope.deepLinkTrack) {
          playlistService.addTrack(track);
          $rootScope.deepLinkTrack = false;
        }
        break;
      }
    }
  })

  if ($stateParams.album) {
    $rootScope.currentAlbumName = $stateParams.album;
  }

  $scope.stopSong = function () {
    $rootScope.trackPath = '';
    $rootScope.trackSelected = '';
  };
};