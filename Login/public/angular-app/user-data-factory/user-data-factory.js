angular.module("loginApp").factory("UserDataFactory", UserDataFactory);

function UserDataFactory($http){
    return{
        login: login,
    };
    function login(user){
        return $http.post("api/auth",user).then(complate).catch(failed);
    };
    function complate(response){
        console.log(response.data);
        return response.data;
    }
    function failed(err){
        return error.status.statusText;
    }
}
