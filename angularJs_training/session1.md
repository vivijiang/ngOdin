AngularJS Directives

1. Start from 0 

2. Get to run!

3. A peek of Direcitive

-----------------------------------------------------
Demo1£º
smallStar


angular.module('myApp.directives', [])

.directive('myAwesomeDirective', ['api', function(api) { //factory function

//Do any one-time directive initialization work here

return function($scope, $element, $attrs) { 

// we can return a function here or a configuration object
//Do directive work that needs to be applied to each
instance here

};
}]);

HTML:
declarative 
data driven 
conversational 
JS:
factory function

debugger
$scope
----------------------------------------------------------

Demo2:
uprunning

EACM(element, attribute, class, comment).
restrict

template
---------------------------------------------

Demo3:
autoCompleteInput

require
scope (false true {})
false-parent scope
true - inherit scope
{} - isolate scope >>>more?



