function mpAudioPlayer(audioPlayerService) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/audioplayer/audioplayer.tpl.html',
    scope: {
      src: '=',
      autoplay: '='
    },
    link: function (scope, element, attrs) {
      //element.on('ended', function () {
      //  playlistService.next();
      //});
      var audio;

      function _onProgress() {
        scope.progress = audio.currentTime / audio.duration;
        scope.$apply();
      }

      function _onCanPlay() {
        scope.duration = audio.duration;
        scope.progress = 0;
      }

      function _buildAudio() {
        if (!audio) {
          audio = document.createElement('audio');
          audio.autoplay = scope.autoplay;
          audio.addEventListener('progress', _onProgress);
          audio.addEventListener('canplay', _onCanPlay);
        }

        audio.src = scope.src;
        if(scope.autoplay && !scope.playing) {
          scope.playPause();
        }
      }

      scope.playing = scope.autoplay;

      scope.playPause = function () {
        if (scope.playing) {
          audio.pause();
        } else {
          audio.play();
        }

        scope.playing = !scope.playing;
      };

      scope.stop = function () {
        audio.pause();
        audio.currentPosition = 0;

        scope.playing = false;
      };

      scope.$watch('src', function () {
        _buildAudio();
      });

      scope.$on('$destroy', function () {
        audio.pause();
      });
    }
  }
}

module.exports = mpAudioPlayer;
