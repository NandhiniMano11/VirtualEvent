const express = require("express");
const login = require("../controller/login.controller");
const router = express.Router(); 

router.route("/login").post(login.login_user);
router.route("/register").post(login.reg_user);

module.exports = router;
