app.controller('Tracks', function($scope, tracksPromise, albumPromise, trackService, $rootScope, $stateParams, $location) {
    $scope.tracks = tracksPromise;

    var _t = this;

    this.getTrackPath = function(track) {
        return '/albums/' + $stateParams.artist + '/tracks/' + $stateParams.album + '/listen/' + track.label;
    }

    this.setCurrentTrack = function(track) {
        $rootScope.trackPath = trackService.getTrackPath(track);
        $rootScope.trackSelected = track.path;
        $rootScope.trackUri = this.getTrackPath(track);
        $rootScope.currentTrack = {
            title: track.title,
            artist: $rootScope.currentArtist.name
        };
    }

    $scope.playSong = function(track) {
        _t.setCurrentTrack(track);
        $location.path(_t.getTrackPath(track));
    };

    $rootScope.$watch('currentTrackName', function(value) {
        var tracksLen = $scope.tracks.length;
        if(!value || !tracksLen) {
            return true;
        }
        for (var i = 0; i < tracksLen; i++) {
            if($scope.tracks[i].label == value) {
                _t.setCurrentTrack($scope.tracks[i]);
                break;
            }
        }
    })

    if($stateParams.album) {
        $rootScope.currentAlbumName = $stateParams.album;
    }

    $scope.stopSong = function() {
        $rootScope.trackPath = '';
        $rootScope.trackSelected = '';
    };
});