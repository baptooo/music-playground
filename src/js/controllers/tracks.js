app.controller('Tracks', function($scope, tracksPromise, albumPromise, trackService, $rootScope, $stateParams) {
    $scope.tracks = tracksPromise;

    $scope.playSong = function(track) {
        $rootScope.trackPath = trackService.getTrackPath(track);
        $rootScope.trackSelected = track.path;
        //touchdevice && scrollView(true);
    };

    if($stateParams.album) {
        $rootScope.currentAlbumName = $stateParams.album;
    }

    $scope.stopSong = function() {
        $rootScope.trackPath = '';
        $rootScope.trackSelected = '';
    };
});