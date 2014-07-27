app.directive('returnTop', function() {
    return {
        restrict: 'C',
        link: function(scope, element) {
            var touchdevice = 'ontouchstart' in window;
            angular.element(element).on('click', function(evt) {
                touchdevice && !top ?
                    window.scrollTo(0, document.body.clientHeight) :
                    document.body.scrollIntoView();
            });
        }
    }
})