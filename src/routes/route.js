const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const collegeController= require("../controllers/CollegeController")
const internController= require("../controllers/internController")




router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/intern",internController.createIntern)
router.get("/functionup",collegeController.getData)

module.exports = router;