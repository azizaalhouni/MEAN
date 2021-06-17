const mongoose = require("mongoose");

const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports.usersRegister = function(req, res){
    console.log("Register User ");
    const newUser = {
        name : req.body.name || null,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User.create(newUser, function(err, user){
        const response = {
            status: 201,
            message : user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err
        }else{
            console.log("User created");
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.usersAthenticate = function(req, res){
    console.log("Authenticate User");
    const authUser = {
        name : req.body.name,
        username : req.body.username
    }
    User.findOne({username : authUser.username}).exec(function(err, user){
        const response = {
            status : 200,
            message : user
        }
        if(err){
            console.log(err);
            response.status = 400;
            response.message = err;
        }else{
            if(!user){
                response.status = 404;
            }else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    console.log("User Authenticated ");
                    const token = jwt.sign({name: user.name},"cs572",{expiresIn:3600});
                    response.message ={
                        success : true,
                        token: token
                    };
                }else{
                    console.log("Unauthorized");
                    response.status = 401;
                    response.message = {"message": "Unauthorized"};
                }
            }
        }
        res.status(response.status).json(response.message);
    });
}