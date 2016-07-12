'use strict';

const AuthService = require('./services/authService');
const DatabaseService = require('./services/databaseService');
const UserService = require('./services/userService');
const shared = angular.module('core.shared', [])
    .service('AuthService', AuthService)
    .service('DatabaseService', DatabaseService)
    .service('UserService', UserService)
;

require('./directives/validation-test/validation-test.directive')(shared);

require('./services/constants')(shared);
// require('./services/authService')(shared);
require('./services/resolver.provider')(shared);

export default shared;
