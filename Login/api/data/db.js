const mongoose = require("mongoose");

require("./users-model");

const dbName = "userDb";
const dbURL = "mongodb://localhost:27017/"+dbName;
//Connect to db
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+ dbURL);
});
mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected to ");
});
mongoose.connection.on("error", function(error){
    console.log("Mongoose connection error "+ error);
});