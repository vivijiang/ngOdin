/**
 * Created by vivi.jiang on 8/26/2014.
 */
'use strict';

angular.module('runDirectivesDemo', ['ng.uprunning','kendo.directives'])
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

        $scope.countryNames = [
            "Albania",
            "Andorra",
            "Armenia",
            "Austria",
            "Azerbaijan",
            "Belarus",
            "Belgium",
            "Bosnia & Herzegovina",
            "Bulgaria",
            "Croatia",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Georgia",
            "Germany",
            "Greece",
            "Hungary",
            "Iceland",
            "Ireland",
            "Italy",
            "Kosovo",
            "Latvia",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macedonia",
            "Malta",
            "Moldova",
            "Monaco",
            "Montenegro",
            "Netherlands",
            "Norway",
            "Poland",
            "Portugal",
            "Romania",
            "Russia",
            "San Marino",
            "Serbia",
            "Slovakia",
            "Slovenia",
            "Spain",
            "Sweden",
            "Switzerland",
            "Turkey",
            "Ukraine",
            "United Kingdom",
            "Vatican City"
        ];

        $scope.colors=[
            'red',
            'green',
            'gray',
            'blue'
        ];

        $scope.expanderTitle = 'What a wonderful day!';
    });