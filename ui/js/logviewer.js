/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var logViewerApp = angular.module('logviewer', ['treeherder']);

logViewerApp.config(function($compileProvider) {
  // Disable debug data, as recommended by https://docs.angularjs.org/guide/production
  $compileProvider.debugInfoEnabled(false);
});
