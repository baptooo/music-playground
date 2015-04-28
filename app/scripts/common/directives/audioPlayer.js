function audioPlayer(playlistService) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('ended', function () {
        playlistService.next();
      });
    }
  }
}

module.exports = audioPlayer;
