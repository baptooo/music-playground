function PlaylistCtrl(playlistService, trackService, $location, $state) {
  var playlist = this;

  playlist.tracks = playlistService.getTracks();
  playlist.listShown = false;

  playlistService.onUpdate(function () {
    playlist.tracks = playlistService.getTracks();
  });

  playlist.playSong = function (track) {
    trackService.setCurrentTrack(track);
    $state.go('artists.albums.tracks.listen', {
      track: track.label
    });
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
