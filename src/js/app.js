var app = angular.module('sandbox', ['ngRoute', 'ui.router', 'ngAnimate']);

app.config(function ($stateProvider, $urlRouterProvider) {

    // Default Route is home
    $urlRouterProvider.otherwise('/');

    // Route configuration
    $stateProvider
        .state('artists', {
            url: '/',
            templateUrl: 'src/views/artists.html',
            resolve: {
                artistPromise: function(artistService) {
                    return artistService.getArtists()
                        .then(function(data) {
                            return data;
                        });
                }
            },
            controller: 'Artists'
        })
        .state('artists.albums', {
            url: 'albums/:artist',
            templateUrl: 'src/views/albums.html',
            resolve: {
                albumPromise: function($stateParams, albumService) {
                    if($stateParams.artist) {
                        return albumService.getAlbumsForArtist($stateParams.artist)
                            .then(function(data) {
                                return data;
                            });
                    }
                }
            },
            controller: 'Albums'
        })
        .state('artists.albums.tracks', {
            url: '/tracks/:album',
            templateUrl: 'src/views/tracks.html',
            resolve: {
                tracksPromise: function($stateParams, trackService) {
                    if($stateParams.album) {
                        return trackService.getTracksForAlbum($stateParams.album)
                            .then(function(data) {
                                return data;
                            });
                    }
                }
            },
            controller: 'Tracks'
        })
});