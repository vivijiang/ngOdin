/**
 * Created by vivi.jiang on 8/26/2014.
 */
'use strict';

angular.module('runDirectivesDemo', ['ng.uprunning'])
    .controller('runDirectivesDemoController', function($scope, $http) {
        $scope.hello = 'hello, this is a demo for validation';

        $scope.integer = 5;
    });