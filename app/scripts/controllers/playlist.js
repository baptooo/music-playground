module.exports = function ($scope, playlistService, trackService, $location) {
  $scope.tracks = playlistService.getTracks();
  $scope.listShown = false;

  playlistService.onUpdate(function () {
    $scope.tracks = playlistService.getTracks();
  });

  $scope.playSong = function (track) {
    trackService.setCurrentTrack(track);
    $location.path(trackService.getTrackRoute(track));
  };

  $scope.removeTrack = function (track) {
    playlistService.removeTrack(track);
  };

  $scope.toggleList = function () {
    $scope.listShown = !$scope.listShown;
  };

  $scope.previous = function () {
    playlistService.previous();
  };

  $scope.next = function () {
    playlistService.next();
  };
};