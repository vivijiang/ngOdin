
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
			dataSourceUrl:''
		};


		$http.post('http://currentodin.ef.com/SalesItemDetail/LoadOfferList?businessNodeKey=OWN-CN', {
			page: 1,
			size:10
		})
			.success(function(largeLoad) {
				debugger;
			});
	});