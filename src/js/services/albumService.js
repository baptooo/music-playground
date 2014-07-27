app.service('albumService', ['$http', '$q', function($http, $q) {
    var apiUrl = '/api/albums/';

    return {
        getAlbumsForArtist: function(name) {
            var _t = this, deffer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl + name + '.json'
            }).success(function(data) {
                var albums = [];
                for(var i in data) {
                    data[i].label = i;
                    albums.push(data[i]);
                }
                return deffer.resolve(albums);
            }).error(function() {
                return deffer.error(new Error('Error, no data.'));
            })
            return deffer.promise;
        },
        getGenre: function(album) {
            return album.genre.join(',');
        },
        getAlbumByName: function(album, artist) {
            return this.getAlbumsForArtist(artist)
                .then(function(data) {
                    var dataLen = data.length;
                    for (var i = 0; i < dataLen; i++) {
                        if(data[i].label == album) {
                            return data[i];
                        }
                    }
                });
        }
    };
}]);