function TracksCtrl($rootScope, tracksPromise, playlistService, trackService) {
  var tracks = this;

  tracks.items = tracksPromise;

  tracks.addToPlaylist = function (track) {
    playlistService.addTrack(track);
  };

  tracks.play = function(track) {
    trackService.setCurrentTrack(track);
  };

  tracks.stop = function() {
    trackService.resetCurrentTrack();
  };

  tracks.toggleTrack = function(track) {
    if($rootScope.trackSelected === track.path) {
      trackService.resetCurrentTrack();
    } else {
      trackService.setCurrentTrack(track);
    }
  }
}

module.exports = TracksCtrl;
