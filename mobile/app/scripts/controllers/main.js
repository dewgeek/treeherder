'use strict';

/**
 * @ngdoc function
 * @name mytreeherderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytreeherderApp
 */
angular.module('mytreeherderApp')
    .controller('MainCtrl', ['$scope', '$interpolate', '$http', 'APP_SETTINGS', 'usSpinnerService',
        function ($scope, $interpolate, $http, appSettings, usSpinnerService) {
        var repo_endpoint = appSettings.serviceUrl+"/api/repository/";
        $scope.repo_options = [];
        $scope.repository = "";
        $scope.email = "";
        $scope.message = "";

        $http.get(repo_endpoint)
        .then(function(response){
            $scope.repo_options.push.apply($scope.repo_options, response.data);
            }
        );
        var resultset_url_template = $interpolate(
                appSettings.serviceUrl+"/api/project/{{repository}}/resultset/?author={{author}}"
        );
        $scope.find_pushes = function(){
            $scope.resultset_list = [];
            var resultset_endpoint = resultset_url_template({
                repository: $scope.repository.name,
                author: $scope.email
            });
            usSpinnerService.spin("main_spinner");
            $scope.message = "";
            $http.get(resultset_endpoint)
            .then(function(response){
                var temp_list = [];
                if(response.data.results.length == 0){
                    $scope.message = "No result sets found :(";
                }else{
                    angular.forEach(response.data.results, function(elem){
                        var total_count = 0;
                        angular.forEach(elem.job_counts, function(qty){
                            total_count += qty;
                        })
                        var pending_running = elem.job_counts.pending + elem.job_counts.running;

                        temp_list.push({
                            revision: elem.revisions[0].revision,
                            push_timestamp: new Date(elem.push_timestamp*1000),
                            status: Math.round((total_count-pending_running)*100.0/total_count)
                        });
                    });
                }
                $scope.resultset_list = temp_list;
                },
                function(error){
                    $scope.message = "Error retrieving data from the server:"+JSON.stringify(error);
                }
            )
            .finally(function(){
                usSpinnerService.stop("main_spinner");
            })

        }
    }]);
