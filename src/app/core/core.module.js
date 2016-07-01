'use strict';

const AuthService = require('./services/authService');
const shared = angular.module('core.shared', [])
    .service('AuthService', AuthService)
;

require('./directives/validation-test/validation-test.directive')(shared);

require('./services/constants')(shared);
// require('./services/authService')(shared);
require('./services/resolver.provider')(shared);

export default shared;
