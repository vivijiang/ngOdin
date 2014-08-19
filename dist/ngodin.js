

'use strict';

(function () {
    var validationDirectives = angular.module('odin.validation.directives', []);

    var INTEGER_REGEXP = /^\-?\d+$/;
    validationDirectives.directive('integer', [
        function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (INTEGER_REGEXP.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('integer', true);
                            return viewValue;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('integer', false);
                            return undefined;
                        }
                    });
                }
            };
        }
    ]);

    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    //
    //parses both 1.2 and 1,2 into a valid float number 1.2
    validationDirectives.directive('smartFloat', [function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            var value = parseFloat(viewValue.replace(',', '.'));
                            ctrl.$setValidity('float', true);
                            return value;
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                }
            };
        }]
    );

})();

'use strict';

angular.module('ng.odin.grid', [
	'ng.odin.grid.services',
	'ng.odin.grid.directives'
]);


(function(window, $) {
    var odinGridDirectives = angular.module('ng.odin.grid.directives', ['ngGrid']);

    odinGridDirectives.directive('odinGrid', ['$http',
        function($http) {
            return {
                restrict: 'E',
                scope: {
                    odinGridOptions: '=odinGridOptions'
                },
                controller: function($scope, $element) {
                    // build ng-grid options

                    $scope.totalServerItems = 0;
                    $scope.pagingOptions = {
                        pageSize: $scope.odinGridOptions.pageSize,
                        currentPage: 1
                    };
                    $scope.setPagingData = function(loadedData) {
                        var pagedData = loadedData.data;
                        $scope.myData = pagedData;
                        $scope.totalServerItems = loadedData.total;

                        // todo: what's this for ?
                        // if (!$scope.$$phase) {
                        //     $scope.$apply();
                        // }
                    };
                    $scope.getPagedDataAsync = function(pageSize, page, orderBy) {
                        setTimeout(function() {
                            var data = {
                                page: page,
                                size: pageSize,
                                orderBy: {}
                            };


                            data.orderBy[$scope.odinGridOptions.sortInfo.fields[0]] = $scope.odinGridOptions.sortInfo.directions[0];

                            $http.post($scope.odinGridOptions.dataSourceUrl, data)
                                .success(function(largeLoad) {
                                    $scope.setPagingData(largeLoad);
                                });

                        }, 100);
                    };
                    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

                    $scope.$watch('pagingOptions', function(newVal, oldVal, scope) {
                        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                        }
                    }, true);


                    $scope.$watch('ngGridOptions.ngGrid.config.sortInfo', function(newVal, oldVal, scope) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                    }, true);

                    $scope.ngGridOptions = {
                        data: 'myData',
                        selectedItems: [],
                        columnDefs: $scope.odinGridOptions.columnDefs,
                        enablePaging: true,
                        showFooter: true,
                        multiSelect: true, // select multiple grid lines
                        totalServerItems: 'totalServerItems',
                        pagingOptions: $scope.pagingOptions,

                        // apply sort when data has been loaded
                        sortInfo: $scope.odinGridOptions.sortInfo,
                        useExternalSorting: $scope.odinGridOptions.useExternalSorting,
                        enableSorting: $scope.odinGridOptions.enableSorting,
                        showSelectionCheckbox: $scope.odinGridOptions.showSelectionCheckbox

                        // filterOptions: $scope.filterOptions
                    };

                },

                template: '<div class="hide-countpicker" style="height:{{odinGridOptions.height}};width:{{odinGridOptions.width}}" ng-grid="ngGridOptions"></div>'

            };
        }
    ]);

})(window, jQuery);
angular.module('ng.odin.grid.services', []);

'use strict';

angular.module('ng.odin.kgrid', [
    'ng.odin.kgrid.services',
    'ng.odin.kgrid.directives'
]);

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
angular.module('ng.odin.kgrid.services', []);
angular.module('ng.odin',
    ['ng.odin.grid',
    'ng.odin.kgrid',
     'odin.validation.directives']);