const express = require("express");
const router = express.Router();
const user = require("./user.route");
const admin = require("./admin.route");
const login = require("./login.route"); 
const auth = require("../middlewares/authorization");
router.use('/user',auth.isAuthenticated, user);
router.use('/admin',auth.isAuthenticated, admin);
router.use('/', login);

module.exports = router;