
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
    }]);

    runDirectives.directive('autoCompleteInput',[function(){
        return {
            require : 'ngModel', // we need access the properties and functions defined in ngModel's controller
//            If you need access to multiple controllers, you can also pass in an array to the
//                require property, and likewise the fourth parameter of your link function will be
//            an array of those controllers.



            // can I get the datasource if I don't use scope? Yes, but the name is colors
            // if set scope then it will set up its own scope so that we can't access the original scope (block inherit)
            scope:{
                odinDataSource:'='
            },
//            controller:function($scope, $element){
//                $scope.odinDataSource
//            },
            link: function($scope,$element,$attrs,ngModel){
                // what's $render (data -> view ) ? and what's $setViewValue (view -> data) ? and what' $viewValue ?
//                The ngModel directive calls $render whenever the value of the data element that it's bound to (data.property in the preceding code) changes.
//                  Thus, once we assign our custom function
//                    to the $render key, any time the data changes, we can update the input value
//                appropriately. $setViewValue works in the opposite direction, so when the user
//                does something that should change the value, we can tell ngModel what the new
//                    value is and it will update the internal data model.
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
    }]);

    runDirectives.directive('helloTransclude',[function(){
        return{
            restrict: 'E',
            template:'<div>Hi there <span ng-transclude></span></div>',
            transclude: true,
            replace: true
        };
    }]);

    runDirectives.directive('expender',[function(){
        return{
            restrict:'E',
            scope:{
                title: '=odinTitle' // pay attention to the naming of scope mapping
            },

            // what's the differences between link and controller defined here ?
//            http://stackoverflow.com/questions/12546945/difference-between-the-controller-link-and-compile-functions-when-definin
//            http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
//            controller:function($scope){
//                $scope.showMe = true;
//                $scope.toggle = function toggle() {
//                    $scope.showMe = !$scope.showMe;
//                };
//            },
            template:'<div><div class="title" ng-click="toggle()">{{title}}</div><div class="body" ng-show="showMe" ng-transclude></div></div>',
            transclude: true,
            link:function(scope, element, attrs) {
                scope.showMe = true;
                scope.toggle = function toggle() {
                    scope.showMe = !scope.showMe;
                };
            }
        };

    }]);
})(window, jQuery);