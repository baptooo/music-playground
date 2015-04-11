module.exports = function (trackService, $rootScope) {
  var tracks = [], tracksClone = [], cbs = [];

  function notifyUpdate() {
    var len = cbs.length;
    for (var i = 0; i < len; i++) {
      cbs[i]();
    }
  }

  function buildCloneList() {
    tracksClone = angular.extend([], tracks);
    notifyUpdate();
  }

  function getID(track) {
    return track.label + (Math.random() * Date.now() << 0);
  }

  function getSibblingTrack(sens) {
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].path == $rootScope.trackSelected) {
        return tracks[i + sens];
      }
    }
  }

  var playlistService = {
    addTrack: function (track) {
      var clone = angular.extend({
        id: getID(track)
      }, track);

      tracks.push(clone);
      buildCloneList();
    },

    getTracks: function () {
      return tracksClone;
    },

    removeTrack: function (track) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].id == track.id) {
          tracks.splice(i, 1);
          buildCloneList();
          break;
        }
      }
    },

    previous: function () {
      if (!tracks.length) {
        return false;
      }
      var previousTrack = getSibblingTrack(-1);
      if (previousTrack) {
        trackService.setCurrentTrack(previousTrack);
      }
    },

    next: function () {
      if (!tracks.length) {
        return false;
      }
      var nextTrack = getSibblingTrack(+1);
      if (nextTrack) {
        trackService.setCurrentTrack(nextTrack);
      }
    },

    onUpdate: function (fn) {
      cbs.push(fn);
    }
  };
  return playlistService;
};