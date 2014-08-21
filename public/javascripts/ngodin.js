

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
                    var data = new kendo.data.DataSource({
                        data:  [{
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
                        }]
                    });
                    $scope.handleChange = function(selected, data, dataItem, columns) {
                        $scope.data = data;
                        $scope.columns = columns;
                        $scope.dataItem = dataItem;
                    };
                    $scope.gridOptions = {
                        dataSource: data,
                        selectable: "row",
                        columns: [
                            { field: "text", title: "Text" },
                            { field: "id", title: "Id" }
                        ]

                    }
                },
                template: ' for kendo :<div kendo-grid k-options="gridOptions" k-rebind="gridOptions.selectable" k-on-change="handleChange(selected, data, dataItem, columns)"></div>'

            };
        }
    ]);

    kGridDirectives.directive('ajaxGrid',['$http',function($http){

            return {
                restrict: 'A',
                scope: {
//                    koptions: '=odinGridOptions'
//                    toolbarQuery:'=toolbarQuery'
                },
                controller: function($scope, $element) {

//                    if(toolbarQuery){
//                        gridOptions.toolbar=kendo.template($(toolbarQuery).html());
//                    }
                    var crudServiceBaseUrl = "/jsonservice";
                    var gridDataSource = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: crudServiceBaseUrl + "/offers",
                                type: "post",
                                dataType: "json"
                                // in transport, we can't set callback here
                                // all callback and error will be set to grid "change" and "error" event
                            },
                            update: {
                                //http://docs.telerik.com/kendo-ui/api/framework/datasource#configuration-transport.update
                                url: crudServiceBaseUrl + "/Update",
                                type: "post",
                                dataType: "json"

                            },
                            destroy: {
                                url: crudServiceBaseUrl + "/Delete",
                                dataType: "json"
                            },
                            create: { // create will be called when saves newly added items
                                //http://docs.telerik.com/kendo-ui/api/framework/datasource#configuration-transport.read
                                url: crudServiceBaseUrl + "/Create",
                                type: "post",
                                dataType: "json"
                            },
                            parameterMap: function (options, operation) {
                                //set parameters for each request type
                                if (operation == "read") {
                                    // this is the data for server paging
                                    //options = {
                                    //take: 10
                                    //skip: 10
                                    //page: 2
                                    //    pageSize: 10
                                    //}
                                    console.log(options);
                                    return options;
                                }
                                else if (options.models && (operation == "update" || operation == "create")) {
                                    return {
                                        models: kendo.stringify(options.models)
                                    };
                                }
                                else if (operation == "destroy" && options.models) {
                                    // send get request like http://localhost:12485/DemoDataApi/OfferSaleItems/Delete?id=1
                                    return {
                                        id: options.models[0].Id
                                    };
                                }
                            }
                        },

                        error: function (xhr, error) {
                        },

                        serverPaging: true, //http://docs.telerik.com/kendo-ui/api/framework/datasource#configuration-serverPaging
                        pageSize: 10//,
                        //take: 10,
                        //skip:10,
                        //page: 2,
//                        schema: {
//                            data: function (response) { // build data for grid if the response is not in expected fomat
//                                var saleItems = $scope.saleItemTypeList;
//                                var gridData = response.data;
//                                gridData.forEach(function (saleItem) {
//                                    var saleItemTypeNameArray = saleItems.filter(function (element) {
//                                        return element.value === saleItem.SaleItemType;
//                                    });
//                                    saleItem.SaleItemTypeName = saleItemTypeNameArray[0].text;
//                                });
//                                return gridData;
//                            },
//                            total: "total"//,
//
//                        }

                    });
                    $scope.gridOptions = {
                        //Setting autoBind to false is useful
                        //when multiple widgets are bound to the same data source.
                        //Disabling automatic binding ensures that the shared data source
                        //doesn't make more than one request to the remote service.
                        //if it's set to false, we need dataSource.read() to fire the "change" event of the dataSource and the widget will be bound
                        //autoBind: false,
                        dataSource: gridDataSource,
                        filterable: true, // will show filter for columns except these columns with filterable: false
                        groupable: true, // for aggregates, default value is false.
                        selectable: "row",
                        pageable: true,
                        //height: 400,
                        //toolbar: ["create"], This is for default add new item function
                        columns: [{
                            //filterable: true,
                            groupable: true, //defalut value is true when groupable is true
                            field: "SaleItemType", // defined in schema data
                            width: "150px"
                        }, {
                            //filterable: true, //default value is true if not set it
                            groupable: false,
                            field: "OfferSaleItemName",
                            title: "Sale Item",
                            width: "300px"
                        },
                            { command: ["edit", "destroy"], title: " ", width: "200px" }],
                        editable: "inline" // available options: inline/popup
                    };


                },
                template: '<div kendo-grid k-options="gridOptions" k-rebind="gridOptions.selectable"></div>'

            };

    }
    ]);

})(window, jQuery);
angular.module('ng.odin.kgrid.services', []);
angular.module('ng.odin',
    ['ng.odin.grid',
    'ng.odin.kgrid',
     'odin.validation.directives']);