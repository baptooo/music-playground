app.controller('Home', ['$scope', 'artistService', 'albumService', 'trackService', function($scope, artistService, albumService, trackService) {
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.artists = [];
    $scope.albums = [];

    var touchdevice = 'ontouchstart' in window;

    artistService.getArtists()
        .then(function(data) {
            $scope.artists = data;
        });

    function scrollView(top) {
        touchdevice && !top ?
            window.scrollTo(0, document.body.clientHeight) :
                document.body.scrollIntoView();
    }

    $scope.getAlbumsForArtist = function(artist) {
        $scope.currentArtist = artist;
        albumService.getAlbumsForArtist(artist.label)
            .then(function(data) {
                $scope.albums = data;
            });
        scrollView();
    };

    $scope.getTracksForAlbum = function(album) {
        $scope.currentAlbum = album;
        $scope.tracksHead = {
            title: album.name,
            artist: $scope.currentArtist.name
        };
        $scope.tracks = [];

        trackService.getTracksForAlbum(album.label)
            .then(function(data) {
                $scope.tracks = data;
            });
        scrollView();
    };

    $scope.getImgSrc = function(data) {
        return data;
    };

    $scope.playSong = function(track) {
        $scope.trackPath = trackService.getTrackPath(track);
        $scope.trackSelected = track.path;
        touchdevice && scrollView(true);
    };

    $scope.stopSong = function() {
        $scope.trackPath = '';
        $scope.trackSelected = '';
    };

    $scope.getAlbumGenre = function(album) {
        return albumService.getGenre(album);
    }

    $scope.numberOfPages = function() {
        return Math.ceil($scope.artists.length / $scope.pageSize);
    };

    $scope.reset = function() {
        $scope.tracks = [];
        $scope.albums = [];
        $scope.currentAlbum = null;
        $scope.currentArtist = null;
        $scope.trackPath = '';
    }
}]);