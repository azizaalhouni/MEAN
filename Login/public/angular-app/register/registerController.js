angular.module("loginApp").controller("RegisterController", RegisterController);

function RegisterController($http){
    const vm = this;
    vm.addNewUser = function(){
        const newUser = {
            name : vm.name,
            username : vm.username,
            password : vm.password
        };
        if(!vm.username || !vm.password){
            vm.err = "Please add userName and password";
        }else{
        if(vm.password !== vm.passwordRepeat){
            vm.err = "passord should match passwordRepet";
        }else{
            $http.post("/api/users", newUser).then(function(result){
                console.log(result);
                vm.message = "Successful registeration, please login";
                vm.err ="";
            }).catch(function(error){
                console.log(error);
            });
        }
        }
    }
}