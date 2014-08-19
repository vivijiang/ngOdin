/**
 * Created by vivi.jiang on 8/19/2014.
 */

'use strict';

(function () {
    var validationDirectives = angular.module('odin.validation.directives', []);

    var INTEGER_REGEXP = /^\-?\d+$/;
    validationDirectives.directive('integer', [
        function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (INTEGER_REGEXP.test(viewValue)) {
                            // it is valid
                            ctrl.$setValidity('integer', true);
                            return viewValue;
                        } else {
                            // it is invalid, return undefined (no model update)
                            ctrl.$setValidity('integer', false);
                            return undefined;
                        }
                    });
                }
            };
        }
    ]);

    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    //
    //parses both 1.2 and 1,2 into a valid float number 1.2
    validationDirectives.directive('smartFloat', [function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            var value = parseFloat(viewValue.replace(',', '.'));
                            ctrl.$setValidity('float', true);
                            return value;
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                }
            };
        }]
    );

})();