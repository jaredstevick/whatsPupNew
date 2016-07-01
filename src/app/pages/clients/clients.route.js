'use strict';

import clientsTpl from './clients.html';

function routeConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('clients', {
      url: '/clients',
      templateUrl: clientsTpl,
      controller: require('./clients.controller'),
      controllerAs: 'clientsCtrl'
    });

}

export default routeConfig;