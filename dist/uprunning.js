
angular.module('ng.uprunning',
    ['ng.uprunning.rundirective']);

'use strict';

angular.module('ng.uprunning.rundirective', [
//    'ng.uprunning.rundirective.services',
    'ng.uprunning.rundirective.directives'
]);

/**
 * Created by vivi.jiang on 8/11/2014.
 */

(function(window, $) {
    var runDirectives = angular.module('ng.uprunning.rundirective.directives', []);

    runDirectives.directive('uprunning', ['$http',
        function($http) {
            return {
                restrict: 'E',
                scope: {
//                    options: '=options'
                },
                controller: function($scope, $element) {
                    // build ng-grid options

//                    $scope.totalServerItems = 0;

//                    $scope.$watch('ngGridOptions.ngGrid.config.sortInfo', function(newVal, oldVal, scope) {
//                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//                    }, true);


                },

                template: '<div> This is a test for uprunning HTML tag </div>'

            };
        }
    ]);

    runDirectives.directive('smallStar',[function(){
        //Do any one-time directive initialization work here

        // we can return a function here or a configuration object

        // This function gets
        // called each time the directive is attached to a DOM element and can be used to
        // attach plugins, retrieve additional data, and so on.
        return function($scope, $element, $attributes){
            //Do directive work that needs to be applied to each instance here

            $scope.sayHello=function(){

                window.alert($scope.tweet.msg);
                // how to understand $scope here? As say directive is added to UL level
                // Oh! it's current object not related the the father or root or...

                // $scope -- the instance of that directive
                // $element -- jQuery wrapped DOM element
                // $attributes -- any attributes attached to the element
            };

            $scope.dance=function(){
                var scope = $scope;
                window.alert('dance');
            };

        }
    }])

    runDirectives.directive('autoCompleteInput',[function(){
        return {
            require : 'ngModel',

            // can I get the datasource if I don't use scope? Yes, but the name is colors
            scope:{
                odinDataSource:'='
            },
//            controller:function($scope, $element){
//                $scope.odinDataSource
//            },
            link: function($scope,$element,$attrs,ngModel){
                ngModel.$render = function(){
                    $element.val(ngModel.$viewValue  || '');
                };
                $element.kendoAutoComplete({
//                    dataSource: {
//                        data: ["One", "Two"]
//                    }
                    dataSource:$scope.odinDataSource
                });
            }
        }
    }])
})(window, jQuery);