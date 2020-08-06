const express = require("express");
const user = require("../controller/user.controller");
const router = express.Router(); 
 
router.route("/update").post(user.update_user);
router.route("/getuserbyId").post(user.getuserbyId);

module.exports = router;
