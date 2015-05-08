'use strict';

var grunt = require('grunt'),
  id3Reader = require('id3_reader');

grunt.task.registerMultiTask('parseApi', 'Api automatic parser', function () {
  var config = grunt.config.get('parseApi'),
    done = this.async(),
    files = grunt.file.expand(config.basePath + '/**/*.mp3'),
    global = [],
    artists = {},
    albums = {},
    tracks = {},
    startTime = Date.now();

  var totalFiles = files.length, i = 0;

  function getID3() {
    var filepath = files.shift();

    console.log((i++) + '/' + totalFiles + ' done...');
    console.log('Reading ID3 tags for: ' + filepath);

    id3Reader.read(filepath, function(err, data) {
      if (!err && data) {
        global.push({
          id3: data,
          path: filepath
        });
      }
      files.length ? getID3() : parseGlobal();
    });
  };
  getID3();

  function formatName(name) {
    return name.toLowerCase().replace(/[^\w+]/gi, '');
  }

  function getPicture(image, formatAlbum) {
    if (!image) {
      return '';
    }

    //var base64String = "";
    //for (var i = 0; i < image.data.length; i++) {
    //  base64String += String.fromCharCode(image.data[i]);
    //}
    //var imageFormat = /\.(jpg|png|gif|bmp)$/i.test(image.format) ? image.format : '.jpg';
    var path = 'api/pictures/' + formatAlbum + '.jpg';
    grunt.file.write(path, image, {
      encoding: 'base64'
    });
    return path;
  }

  function parseGlobal() {
    var len = global.length;
    for (var i = 0; i < len; i++) {
      var id3 = global[i].id3,
        artist = id3.artist;

      if (!artist) {
        continue;
      }

      // Artists
      var formatArtist = formatName(artist);

      if (!artists[formatArtist]) {
        artists[formatArtist] = artist;
      }

      // Albums
      var formatAlbum = formatArtist + '-' + formatName(id3.album);
      if (!albums[formatArtist]) {
        albums[formatArtist] = {};
      }
      if (!albums[formatArtist][formatAlbum]) {
        albums[formatArtist][formatAlbum] = {
          name: id3.album,
          year: id3.year,
          genre: id3.genre,
          picture: getPicture(id3.attached_picture, formatAlbum)
        };
      }

      // Tracks
      var formatTrack = formatName(id3.title);
      if (!tracks[formatAlbum]) {
        tracks[formatAlbum] = {};
      }
      if (!tracks[formatAlbum][formatTrack]) {
        tracks[formatAlbum][formatTrack] = {
          title: id3.title,
          duration: id3.duration,
          track: id3.track,
          disk: id3.disk,
          path: global[i].path
        }
      }
    }
    for (var i in albums) {
      grunt.file.write('api/albums/' + i + '.json', JSON.stringify(albums[i]));
    }
    for (var i in tracks) {
      grunt.file.write('api/tracks/' + i + '.json', JSON.stringify(tracks[i]));
    }
    grunt.file.write('api/artists.json', JSON.stringify(artists));

    var elapsed = (Date.now() - startTime) / 1000;

    console.log('Success, parsing tooks: ' + elapsed + 's');
    done();
  }
});
