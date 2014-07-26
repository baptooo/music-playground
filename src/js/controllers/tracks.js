app.controller('Tracks', function($scope, tracksPromise, trackService, $rootScope) {
    $scope.tracks = tracksPromise;

    $scope.playSong = function(track) {
        $rootScope.trackPath = trackService.getTrackPath(track);
        $rootScope.trackSelected = track.path;
        //touchdevice && scrollView(true);
    };

    $scope.stopSong = function() {
        $rootScope.trackPath = '';
        $rootScope.trackSelected = '';
    };
});