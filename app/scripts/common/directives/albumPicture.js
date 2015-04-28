'use strict';

function albumPicture() {
  return {
    restrict: 'A',
    scope: {

    },
    link: function(scope, elt, attrs) {
      var picturePath = attrs['albumPicture'],
        lazyImg = document.createElement('img');

      function _clean() {
        lazyImg.onload = lazyImg.onerror = null;
        document.body.removeChild(lazyImg);
      }

      lazyImg.onload = function() {
        elt.attr('src', picturePath);
        _clean();
      };
      lazyImg.onerror = function() {
        elt.attr('src', '/assets/album-placeholder.jpg');
        _clean();
      };

      lazyImg.src = picturePath;
      lazyImg.style.width = lazyImg.style.height = '1px';

      document.body.appendChild(lazyImg);
    }
  }
}

module.exports = albumPicture;
