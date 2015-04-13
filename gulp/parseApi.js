var through = require('through2'),
  mmd = require('musicmetadata'),
  artists = {},
  startTime;

function formatName(name) {
  return name.toLowerCase().replace(/[^\w+]/gi, '');
}

function store(id3) {
  var artist = id3.artist.length ? id3.artist[0] : '',
    artistFormatted = formatName(artist);

  if (artist && !artists[artistFormatted]) {
    artists[artistFormatted] = artist;
  }
}

function getID3(chunk) {
  var stream = through();
  stream.write(chunk.contents);

  return mmd(stream).metadata;
}

function _parseId3() {
  startTime = Date.now();

  return through.obj(function (chunk, enc, cb) {
    var id3 = getID3(chunk);

    store(id3);

    console.log(chunk.path);

    if(chunk.isBuffer()) {
      chunk.contents = new Buffer(JSON.stringify(artists));
      chunk.path = 'api_test/artists.json';
    }

    this.push(chunk);

    cb();
  }, _parsingFinished);
}

function _parsingFinished(cb) {
  var elapsed = (Date.now() - startTime) / 1000;
  console.log('Success, parsing tooks: ' + elapsed + 's');
  cb();
}

module.exports = _parseId3;