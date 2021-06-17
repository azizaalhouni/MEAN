require("./api/data/db");

const express = require("express");
const app = express();

const path = require("path");
const routes = require("./api/router");

app.set("port", 4000);

app.use(express.json());

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("Listening to post "+ port);
});