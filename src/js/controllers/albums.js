app.controller('Albums', function($scope, albumPromise, $location, albumService, $stateParams, $rootScope) {
    $scope.albums = albumPromise;

    $scope.navigateToTracks = function(album) {
        $rootScope.currentAlbum = album;
        $rootScope.tracksHead = {
            title: album.name,
            artist: $scope.currentArtist.name
        }
        $location.path('/albums/' + $stateParams.artist + '/tracks/' + album.label);
    }

    $scope.getAlbumGenre = function(album) {
        return albumService.getGenre(album);
    };
});