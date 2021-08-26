const mongoose = require("mongoose");

require("./jobSearch-model");
const dbName = "jobSearchDB";
const dbURL = "mongodb://localhost:27017/"+ dbName;

//connect to db
mongoose.connect(dbURL,{
    useNewUrlParser: true, useUnifiedTopology: true});
    process.on("SIGINT", function(){
        //DISCONNECTED
        mongoose.connection.close(function(){
            console.log("Mongoose disconnected by app termination");
            process.exit(0);
        });
    });
    //TERMINATION
    process.on("SIGTERM", function(){
        mongoose.connection.close(function(){
            console.log("Mongoose disconnected by app termination");
            process.exit(0);
        });
    });
    //RESTART
    process.on("SIGUSR2", function(){
        mongoose.connection.close(function(){
            console.log("Mongoose disconnected by app termination");
            process.kill(process.pid,"SIGUSR2");
        });
    });
    mongoose.connection.on("connected", function(){
        console.log("Mongoose connected to "+ dbURL);
    });
    mongoose.connection.on("disconnected", function(){
        console.log("Mongoose disconnected");
    });
    mongoose.connection.on("error", function(err){
        console.log("Mongoose connection error "+ err);
    });
