angular.module("jobSearch").factory("JobSearchDataFactory", JobSearchDataFactory);

function JobSearchDataFactory($http){
    return{
        getAllJobs : getAllJobs,
        getOneJob : getOneJobs,
        addNewJob : addNewJob,
        replaceOneJob : replaceOneJob,
        partialUpdateJob : partialUpdate,
        deleteOneJob : deleteOneJob
    };
    function getAllJobs(){
       return $http.get("/api/jobs").then(complete).catch(failed);
       //return $http.get(`/api/jobs?count=${count}&offset = ${offset}`).then(complete).catch(failed);
    };
    function getOneJobs(jobId){
        return $http.get("/api/jobs/"+jobId).then(complete).catch(failed);
    };
    function addNewJob(job){
        return $http.post("/api/jobs",job).then(complete).catch(failed);
    };
    function replaceOneJob(jobId, job){
        return $http.put("/api/jobs/"+jobId, job).then(complete).catch(failed);
    };
    function partialUpdate(jobId, job){
        return $http.patch("/api/jobs/"+ jobId, job).then(complete).catch(failed);
    }
    function deleteOneJob(jobId){
        return $http.delete("api/jobs/"+jobId).then(complete).catch(failed);
    };
    function complete(response){
        return response.data;
    }
    function failed(err){
        return error.status.statusText;
    }
}