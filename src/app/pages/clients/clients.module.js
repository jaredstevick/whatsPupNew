'use strict';

import route from './clients.route';
import './clients.scss';

const clientsPageModule = angular.module('clients-module', [
  'ui.router'
]);

clientsPageModule
    .config(route);

export default clientsPageModule;