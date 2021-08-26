

angular.module("jobSearch").controller("JobOneController", JobOneController);

function JobOneController($routeParams, JobSearchDataFactory,$route,$location){
    const vm = this;
    const jobId = $routeParams.id;
    JobSearchDataFactory.getOneJob(jobId).then(function(response){
        vm.job = response;
        vm.editedJobSalary = response.salary;
        vm.editedJobDescription = response.description;
        vm.editedJobExperience = response.experience;
        vm.editedJobSkills = response.skills;
        vm.editedJobzipCode =response.location.zipCode;
        vm.editedJobStreet = response.location.street;
        vm.skills = response.skills;
    });
   vm.updateOneJob = function(){
    const editedJob = {
        title: vm.job.title,
        salary: vm.editedJobSalary,
        description: vm.editedJobDescription,
        experience : vm.editedJobExperience,
        skills: vm.editedJobSkills,
        postDate : vm.job.postDate,
        street : vm.editedJobStreet,
        zipCode : vm.editedJobzipCode
    };
    if(vm.updateJobForm.$valid){
        
        JobSearchDataFactory.replaceOneJob(jobId,editedJob).then(function(response){
           $route.reload();
        //   window.location.reload();
            console.log("Job updated...");     
    }).catch(function(error){
        console.log(error);
    });
}
   }
   ///////////////////////Patch partial update
   vm.partialUpdateJob = function(){
       const updateJob={};
       if(vm.job.salary != vm.editedJobSalary){
           updateJob.salary = vm.editedJobSalary;
       }
       if(vm.job.skills != vm.editedJobSkills){updateJob.salary = vm.editedJobSalary;}
  ////if(vm.updateJobForm.$valid){
    
    JobSearchDataFactory.partialUpdateJob(jobId,updateJob).then(function(response){
       $route.reload();
    //   window.location.reload();
        console.log("Job updated...");      
}).catch(function(error){
    console.log(error);
});
//}
   }
vm.deleteOneJob = function(){

    JobSearchDataFactory.deleteOneJob(jobId).then(function(response){
        console.log("Job deleted");
        $location.path("/");
    });
}

}




