angular.module("loginApp").directive("loginNavigation", LoginNavigation);

function LoginNavigation(){
    return{
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}