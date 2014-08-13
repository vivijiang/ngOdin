/**
 * Created by vivi.jiang on 8/11/2014.
 */

(function(window, $){
    var odinGridDirectives = angular.module('ng.odin.grid.directives', ['ngGrid']);
    odinGridDirectives.directive('myCustomer', [function(){
        return {
            restrict: 'E',
            scope: {
                customer: '=info'
            },
            template: 'Name: {{customer.name}} Address: {{customer.address}}'
        };
    }]);

    odinGridDirectives.directive('odinGrid', [function(){
        return {
            restrict: 'E',
            scope: {
                ngGridOptions: '=odinGridOptions'
            },
            template: '<div class="hide-countpicker" style="height:{{ngGridOptions.height}};width:{{ngGridOptions.width}}" ng-grid="ngGridOptions"></div>'

        };
    }]);

})(window, jQuery);
