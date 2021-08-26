const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    street : String,
    zipCode : Number
});
const jobSchema = new mongoose.Schema({
        title :{
            type:String,
            required : true
        } ,
        companyName : String,
        salary : Number,
        description : String,
        experience : String,
        skills : [String],
        postDate : {
            type: Date,
            "default" : Date.Now
        },
        dayApplied : Date,
        location : locationSchema
});

mongoose.model("Job", jobSchema,"jobs");