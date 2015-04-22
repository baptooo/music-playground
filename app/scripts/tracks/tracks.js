function TracksCtrl($scope, tracksPromise, playlistService) {
  var tracks = this;

  tracks.items = tracksPromise;

  $scope.addToPlaylist = function (track) {
    playlistService.addTrack(track);
  };
}

module.exports = TracksCtrl;
