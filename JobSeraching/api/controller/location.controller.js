const { response } = require("express");
const mongoose = require("mongoose");

const Job = mongoose.model("Job");

module.exports.addLocation = function(req, res){
    console.log("Adding location");
    const response = {
        status : 201,
        message : ""
    };
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function(err, job){
        if(err){
            response.status = 500;
            response.message = err;
            console.log("Error found");
            res.status(500).json(err);
        }else if(!job){
            response.status = 404;
            response.message ={"message": "Job ID not found "+ jobId};
            res.status(404).json(response.message);
        }
        if(job){
            console.log("Job found");
            if(! (job.location.street)){
                job.location = {
                street:"empty",
                zipCode: 000
            };
        }
            job.location.street = req.body.street;
            job.location.zipCode = req.body.zipCode;
            job.save(function(err, addedLocation){
                if(err){
                    response.status = 500;
                    response.message = err;
                    //response.status(500).json(err);
                }else{
                    console.log("Location saved");
                    response.status = 201;
                    response.message = addedLocation;
                }
                res.status(response.status).json(response.message);
            });
        
        }else{
            //response.message = addedLocation;
            response.status(response.status).json(response.message);
        }
    });
}
module.exports.updateLocation = function(req, res){
    const response = {
        status : 204,
        message : ""
    };
    const jobId = req.params.jobId;
    Job.findById(jobId).select("location").exec(function(err, job){
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!job){
            response.status = 404;
            response.message = {"message":"Job Id not found"};
        }
        if(job){
            job.location.street = req.body.street;
            job.location.zipCode = req.body.zipCode;
            job.save(function(err, updatedLocation){
                if(err){
                    response.status = 500;
                    response.message = err;
                }else{
                    response.status = 204;
                    response.message = updatedLocation;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}
module.exports.deletLocation = function(req, res){
    const jobId = req.params.jobId;
    const locationId = req.params.locationId;
    Job.findById(jobId).select("location").exec(function(err, job){
        console.log("Deleting.....");
        if(err){
            res.status(500).json(err);
        }else if(!job){
            res.status(404).json({"message":"No Id found"});
        }
        if(job){
            job.location.id(locationId).remove();

            job.save(function(err, deletedLocation){
                if(err){
                    res.status(500).json(err);
                }
                    consold.log("deleted Succfully!!")
                    res.status (204).json(deletedLocation);
            });
        }
    });
}