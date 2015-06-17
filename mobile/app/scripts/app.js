'use strict';

/**
 * @ngdoc overview
 * @name mytreeherderApp
 * @description
 * # mytreeherderApp
 *
 * Main module of the application.
 */
angular
  .module('mytreeherderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularSpinner'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('APP_SETTINGS', {
    'serviceUrl': 'https://treeherder.mozilla.org'
  })
