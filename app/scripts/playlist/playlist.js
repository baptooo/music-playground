function PlaylistCtrl($scope, playlistService, trackService, $location) {
  var playlist = this;

  playlist.tracks = playlistService.getTracks();
  playlist.listShown = false;

  playlistService.onUpdate(function () {
    playlist.tracks = playlistService.getTracks();
  });

  playlist.playSong = function (track) {
    trackService.setCurrentTrack(track);
    $location.path(trackService.getTrackRoute(track));
  };

  playlist.removeTrack = function (track) {
    playlistService.removeTrack(track);
  };

  playlist.toggleList = function () {
    playlist.listShown = !playlist.listShown;
  };

  playlist.previous = function () {
    playlistService.previous();
  };

  playlist.next = function () {
    playlistService.next();
  };
}

module.exports = PlaylistCtrl;
