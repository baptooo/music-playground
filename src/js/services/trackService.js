app.service('trackService', ['$http', '$q', function($http, $q) {
    var apiUrl = '/api/tracks/',
        trackBaseUrl = '/track/?path=';

    return {
        getTracksForAlbum: function(name) {
            var deffer = $q.defer();
            $http({
                method: 'GET',
                url: apiUrl + name + '.json'
            }).success(function(data) {
                var tracks = [];
                for(var i in data) {
                    data[i].label = i;
                    tracks.push(data[i]);
                }
                return deffer.resolve(tracks);
            }).error(function() {
                return deffer.error(new Error('Error, no data.'));
            })
            return deffer.promise;
        },
        getTrackPath: function(track) {
            return trackBaseUrl + escape(track.path);
        }
    }
}]);