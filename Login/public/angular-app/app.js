angular.module("loginApp", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/welcome/welcome.html",
         access :{restricted : false}
    }).when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs:"vm",
         access : {restricted: false}
    }).otherwise({
        redirect:"/"
     });
}
function run($rootScope,$location,$window){
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        console.log(nextRoute);
        if(nextRoute.access !== undefined && nextRoute.access.restricted 
            && !$window.sessionStorage.token && !$window.sessionStorage.isLoggedIn){
            event.preventDefault();
            $location.path("/");
        }
    });
}