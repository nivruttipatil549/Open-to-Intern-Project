const mongoose = require("mongoose");
require('mongoose-type-url');

const collegeModel = new mongoose.Schema({
  name: { type: String, unique: true, required: "Enter the college name", lowercase: true, trim : true },
  fullname: { type: String, required: "Enter the full name" ,trim : true},
  logolink: { type: mongoose.SchemaTypes.Url, required: true},
  isDeleted: { type: Boolean, default: false },
  interests:[]
});
module.exports = mongoose.model("CollegeData", collegeModel);


