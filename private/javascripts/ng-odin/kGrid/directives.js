/**
 * Created by vivi.jiang on 8/15/2014.
 */
/**
 * Created by vivi.jiang on 8/11/2014.
 */

(function(window, $) {
    var kGridDirectives = angular.module('ng.odin.kgrid.directives',['kendo.directives']);

    kGridDirectives.directive('kGrid', ['$http',
        function($http) {
            return {
                restrict: 'E',
                scope: {
//                    odinGridOptions: '=odinGridOptions'
                },
                controller: function($scope, $element) {
                    // build kendoUI Grid options
                    $scope.saleItemTypeList = [{
                        text: "huhu",
                        value: "1"
                    }, {
                        text: "haha",
                        value: "2"
                    }, {
                        text: "CD",
                        value: "3"
                    }, {
                        text: "iLab",
                        value: "4"
                    }];


                },

                template: ' for kendo :<select kendo-drop-down-list ng-model="selectedSaleItemType" ng-options="saleItemType as saleItemType.text for saleItemType in saleItemTypeList"></select>'

            };
        }
    ]);

})(window, jQuery);