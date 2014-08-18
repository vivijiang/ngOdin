/**
 * Created by vivi.jiang on 8/15/2014.
 */
/**
 * Created by vivi.jiang on 8/11/2014.
 */

(function(window, $) {
    var kGridDirectives = angular.module('ng.odin.kgrid.directives',[]);

    kGridDirectives.directive('kGrid', ['$http',
        function($http) {
            return {
                restrict: 'E',
                scope: {
                    odinGridOptions: '=odinGridOptions'
                },
                controller: function($scope, $element) {
                    // build kendoUI Grid options
                    // for ajax coursetypelevel data


                },

                template: '<span>test</span>'

            };
        }
    ]);

})(window, jQuery);