/**
 * Created by vivi.jiang on 8/12/2014.
 */

'use strict';

angular.module('GridDemo', ['ng.odin.grid'])
	.controller('GridDemoController', function($scope, $http) {
		$scope.hello = 'hello, this is a demo for grid';
		
		$scope.customGrid = {
			height: '300px',
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
				displayName: 'Offer Name',
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
	});