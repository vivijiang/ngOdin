/**
 * Created by vivi.jiang on 8/12/2014.
 */

'use strict';

angular.module('GridDemo', ['kendo.directives','ng.odin'])
	.controller('GridDemoController', function($scope, $http) {
		$scope.hello = 'hello, this is a demo for grid';
		
		$scope.customGrid = {
			height: '240px',
			width: '500px',
			showSelectedCount: false,
			showSelectionCheckbox: true,
			multiSelect: true,

			sortInfo: { fields: ['Name'], directions: ['asc' || 'desc'] },
			useExternalSorting: true,
			enableSorting: true,
			showFooter: true,
			dataSourceUrl: '/jsonservice/offer-list',
			pageSize: 5,
			columnDefs: [{
				field: 'Name',
				displayName: 'Offer Name'
				//sortFn: getServerSortedData
			}, {
				field: 'OfferPrice',
				displayName: 'Offer Price',
				sortable: false
			}, {
				field: 'Description',
				displayName: 'Description',
				sortable: false
			}]
		};

        $scope.saleItemTypeList = [{
            text: "Book",
            value: "1"
        }, {
            text: "Course",
            value: "2"
        }, {
            text: "CD",
            value: "3"
        }, {
            text: "iLab",
            value: "4"
        }];


        // for kendo grid
        var crudServiceBaseUrl = "/jsonservice";
        $scope.clientGridOptions = {
            sortable: true,
            selectable: true,
            dataSource: [
                { text: "Foo", id: 1 },
                { text: "Bar", id: 2 },
                { text: "Baz", id: 3 }
            ],
            columns: [
                { field: "text", title: "Text" }
            ]
        };

        var gridDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: crudServiceBaseUrl + "/offers",
                    type: "post",
                    dataType: "json"
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
            schema: {
                data: function (response) { // build data for grid if the response is not in expected fomat

                    var gridData = response.data;
                    return gridData;
                },
                total: "total"
            }

//            error: function (xhr, error) {
//            },

            //serverPaging: true, //http://docs.telerik.com/kendo-ui/api/framework/datasource#configuration-serverPaging
            //pageSize: 10

        });
        $scope.gridOptions = {
            //Setting autoBind to false is useful
            //when multiple widgets are bound to the same data source.
            //Disabling automatic binding ensures that the shared data source
            //doesn't make more than one request to the remote service.
            //if it's set to false, we need dataSource.read() to fire the "change" event of the dataSource and the widget will be bound
            //autoBind: false,
            dataSource: gridDataSource,
            sortable: true,
            selectable: true,
          //  filterable: true, // will show filter for columns except these columns with filterable: false
           // groupable: true, // for aggregates, default value is false.
           // selectable: "row",
           // pageable: true,
            //height: 400,
            //toolbar: ["create"], This is for default add new item function
            columns: [{
                //filterable: true,
//                groupable: true, //defalut value is true when groupable is true
                field: "SaleItemType", // defined in schema data
                width: "150px",
                title: "Sale Item Type"

            }, {
                //filterable: true, //default value is true if not set it
//                groupable: false,
                field: "OfferSaleItemName",
                title: "Sale Item",
                width: "300px"
            }]//,
          //      { command: ["edit", "destroy"], title: " ", width: "200px" }],
           // editable: "inline" // available options: inline/popup
        };

    });