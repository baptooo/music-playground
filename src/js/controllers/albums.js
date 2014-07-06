app.controller('Albums', ['$scope', 'albumService', '$stateParams', function($scope, albumService, $stateParams) {
    albumService.getAlbumsForArtist($stateParams.artist)
        .success(function(data) {
            $scope.albums = data;
        });
}]);