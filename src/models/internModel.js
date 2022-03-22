const mongoose = require("mongoose");

const internModel = new mongoose.Schema({
  name: { type: String , trim : true , required: 'Enter your Name'},
  email: {
    type: String,
    required: "Enter the Email id",
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: "Please enter a valid email",
    },
    unique: true,
  },
  mobile: { type: String,    
     validate: {
    validator: function(v) {
      return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(v);
    },
    message: '{VALUE} is not a valid phone number!'
  },
  required: [true, 'User phone number required']
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollegeData",
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("internData", internModel);
//required: true, match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
 // , unique: true },