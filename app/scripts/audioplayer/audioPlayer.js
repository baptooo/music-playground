function mpAudioPlayer(audioPlayerService) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/audioplayer/audioplayer.tpl.html',
    scope: {
      src: '='
    },
    link: function (scope, element, attrs) {
      //element.on('ended', function () {
      //  playlistService.next();
      //});
      var audio = element.find('audio')[0];

      function _onPlay() {
        $timeout(function() {
          scope.playing = true;
        });
      }

      function _onPause() {
        $timeout(function() {
          scope.playing = false;
        });
      }

      audio.addEventListener('play', _onPlay);
      audio.addEventListener('pause', _onPause);

      scope.pause = function() {
        audio.pause();
      };

      scope.$on('$destroy', function() {
        audio.removeEventListener('play', _onPlay);
        audio.removeEventListener('pause', _onPause);
      });
    }
  }
}

module.exports = mpAudioPlayer;
