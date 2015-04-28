function TracksCtrl(tracksPromise, playlistService, trackService) {
  var tracks = this;

  tracks.items = tracksPromise;

  tracks.addToPlaylist = function (track) {
    playlistService.addTrack(track);
  };

  tracks.stopSong = function() {
    trackService.resetCurrentTrack();
  }
}

module.exports = TracksCtrl;
