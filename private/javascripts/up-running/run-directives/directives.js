/**
 * Created by vivi.jiang on 8/26/2014.
 */
/**
 * Created by vivi.jiang on 8/11/2014.
 */

(function(window, $) {
    var runDirectives = angular.module('ng.uprunning.rundirective.directives', []);

    runDirectives.directive('test', ['$http',
        function($http) {
            return {
                restrict: 'E',
                scope: {
                    options: '=options'
                },
                controller: function($scope, $element) {
                    // build ng-grid options

                    $scope.totalServerItems = 0;

                    $scope.$watch('ngGridOptions.ngGrid.config.sortInfo', function(newVal, oldVal, scope) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                    }, true);


                },

                template: '<div> test</div>'

            };
        }
    ]);

})(window, jQuery);