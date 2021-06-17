const express = require("express");
const router = express.Router();

const controllerUsers = require("../controller/users.controller");

router.route("/users")
.post(controllerUsers.usersRegister);

router.route("/auth")
.post(controllerUsers.usersAthenticate);

module.exports = router;