'use strict';

import mainTpl from './main.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: mainTpl,
      controller: require('./main.controller'),
      controllerAs: 'mainCtrl'
    });

}

export default routeConfig;
