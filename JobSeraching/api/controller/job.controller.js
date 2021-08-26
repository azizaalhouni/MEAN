const mongoose = require("mongoose");

const Job = mongoose.model("Job");

module.exports.JobSearchingGetAll = function(req,res){
    console.log("Get all jobs");
    let offset =0;
    let count = 20;
    var maxCount = 30;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(isNaN(offset)|| isNaN(count)){
        res.status(400).json({"message":"QueryString Offset and Count should be numbers"});
        return;
    }
    if(count > maxCount){
        res.status(400).json({"message":"Cannot exceed count of "+ maxCount});
        return;
    }
    Job.find().skip(offset).limit(count).exec(function(err, jobs){
        if(err){
            console.log("Error finding games");
            res.status(500).json(err);
        }else{
            console.log("Found jobs",jobs.length);
            res.json(jobs);
        }
       // res.status(200).json(jobs);
    });
}
module.exports.JobSerchingGetOneJob = function(req, res){
    console.log("Get One Job");
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err,job){
        res.status(200).json(job);
    });
}

module.exports.addOneJob = function(req, res){
    const response = {
        status : 201,
        message : ""
    };
    const newJob = {};
    newJob.title = req.body.title;
    newJob.companyName = req.body.companyName;
    newJob.salary = parseFloat(req.body.salary);
    newJob.description = req.body.description;
    newJob.experience = req.body.experience;
    newJob.skills = req.body.skills;
    newJob.location = {};
    newJob.location.street = req.body.street;
    newJob.location.zipCode = req.body.zipCode;
    newJob.postDate = req.body.postDate;
    newJob.dayApplied = req.body.dayApplied;
    // newJob.postDate = postDate.default;
   
    Job.create(newJob, function(err, job){
        if(err){
            console.log("Error creating job");
            res.status(400).json(err);
        }else{
           console.log("Job created", job);
        res.status(201).json(job);
        }
    });
   
}
module.exports.updateOneJob = function(req, res){
    const response = {
        status : 204,
        message : ""
    };
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job){
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message ={"message":"JobId not found"};
        }if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        job.title = req.body.title;
        job.salary = parseFloat(req.body.salary);
        job.description = req.body.description;
        job.experience = req.body.experience;
        job.skills = req.body.skills;
        
        job.location.street = req.body.street;
        job.location.zipCode = req.body.zipCode;
        job.save(function(err, updatedJob){
            if(err){
                console.log("Error creating job");
                res.status(400).json(err);
            }else{
               console.log("Job created", updatedJob);
            res.status(201).json(updatedJob);
            }
        });
    });   
}
module.exports.partialUpdate = function(req, res){
    const response = {
        status : 204,
        message : ""
    };
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job){
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message ={"message":"JobId not found"};
        }if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        if(req.body.salary){job.salary = parseInt(req.body.salary);}
        if(req.body.skills){job.skills = req.body.skills;}
        job.save(function(err, updateJob){
            if(err){
                console.log("Error creating job");
                res.status(400).json(err);
            }else{
               console.log("Job updated", updateJob);
            res.status(201).json(updateJob);
            }
        });
    });   
}

module.exports.deleteOneJob = function(req, res){
    const response = {
        status : 204,
        message : ""
    };
    const jobId = req.params.jobId;
    Job.findByIdAndDelete(jobId).exec(function(err, job){
        if(err){
            response.status = 500;
            response.message = err;
        }else if(! job){
            response.status = 404;
            response.message = {"message": "job Id not found"};
        }
            res.status(response.status).json(response.message);
        
    });
}