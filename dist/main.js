
'use strict';

angular.module('GridDemo', ['ng.odin.grid'])
	.controller('GridDemoController', function($scope, $http) {
		$scope.hello = 'hello, this is a demo for grid';
		$scope.igor = {
			name: 'Igor',
			address: '123 Somewhere'
		};
		$scope.customGrid = {
			height: '300px',
			width: '500px',
			showSelectedCount: false,
			multiSelect: true,
			showFooter: true,
			dataSourceUrl: '/jsonservice/offer-list',
			pageSize: 5
		};


		// $http.post('/json/offer-list.json', {
		// 	page: 1,
		// 	size:10
		// })
		$http.post('/jsonservice/offer-list')
			.success(function(largeLoad) {
				debugger;
			});
	});