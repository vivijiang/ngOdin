/**
 * Created by vivi.jiang on 8/26/2014.
 */
'use strict';

angular.module('runDirectivesDemo', ['ng.uprunning'])
    .controller('runDirectivesDemoController', function($scope, $http) {
        $scope.hello = 'hello, this is a demo for up&running with directives';

        $scope.tweets=[
            {
                author:'vivi',
                msg:'this is a test for vivi item'
            },
            {
                author:'nancy',
                msg:'this is a test for nancy item'
            }
        ];
    });