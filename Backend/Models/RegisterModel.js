const mongoose = require("mongoose");

const RegisterUser = new mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    mobileNo : String

})

module.exports = mongoose.model('Registeruser', RegisterUser);