/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var treeherderApp = angular.module('treeherder.app',
                                   ['treeherder', 'ui.bootstrap', 'ngRoute',
                                    'mc.resizer', 'angular-toArrayFilter']);

treeherderApp.config(function($compileProvider, $routeProvider, $httpProvider, $logProvider) {
    // Disable debug data, as recommended by https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(false);

    // enable or disable debug messages using $log.
    // comment out the next line to enable them
    $logProvider.debugEnabled(false);

    // avoid CORS issue when getting the logs from the ftp site
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.useApplyAsync(true);

    $routeProvider.
        when('/jobs', {
            controller: 'JobsCtrl',
            templateUrl: 'partials/main/jobs.html',
            // see controllers/filters.js ``skipNextSearchChangeReload`` for
            // why we set this to false.
            reloadOnSearch: false
        }).
        when('/jobs/:tree', {
            controller: 'JobsCtrl',
            templateUrl: 'partials/main/jobs.html',
            reloadOnSearch: false
        }).
        when('/timeline', {
            controller: 'TimelineCtrl',
            templateUrl: 'partials/main/timeline.html'
        }).
        when('/machines', {
            controller: 'MachinesCtrl',
            templateUrl: 'partials/main/machines.html'
        }).
        otherwise({redirectTo: '/jobs'});
});
