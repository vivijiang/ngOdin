/**
 * Created by vivi.jiang on 8/11/2014.
 */

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
                                size: pageSize
                            };

                            data.orderBy = $scope.odinGridOptions.sortInfo.fields[0] + '-' + $scope.odinGridOptions.sortInfo.directions[0];

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