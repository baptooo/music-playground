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
        scrollView();
    };

    var watchArtist = $rootScope.$watch('currentArtistName', function(value) {
        var dataLen = $scope.artists.length;
        if(!value || !dataLen) {
            return true;
        }
        for (var i = 0; i < dataLen; i++) {
            if($scope.artists[i].label == value) {
                $rootScope.currentArtist = $scope.artists[i];
                break;
            }
        }
        watchArtist();
    });

    $scope.reset = function() {
        $scope.tracks = [];
        $scope.albums = [];
        $scope.currentAlbum = null;
        $scope.currentArtist = null;
        $scope.trackPath = '';
    }
});