angular.module("jobSearch",["ngRoute"]).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/jobs-list/jobList.html",
        controller: "JobSearchController",
        controllerAs: "vm"
    }).when("/jobs/:id",{
        templateUrl: "angular-app/job-one/job-one.html",
        controller: "JobOneController",
        controllerAs: "vm"
    });
}