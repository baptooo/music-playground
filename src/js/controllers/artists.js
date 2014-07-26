app.controller('Artists', function($scope, artistPromise, $location, $rootScope) {
    $scope.artists = artistPromise;

    var touchdevice = 'ontouchstart' in window;

    function scrollView(top) {
        touchdevice && !top ?
            window.scrollTo(0, document.body.clientHeight) :
            document.body.scrollIntoView();
    }

    $scope.navigateToArtist = function(artist) {
        $rootScope.currentArtist = artist;
        $location.path('/albums/' + artist.label);
    };

    $scope.reset = function() {
        $scope.tracks = [];
        $scope.albums = [];
        $scope.currentAlbum = null;
        $scope.currentArtist = null;
        $scope.trackPath = '';
    }
});