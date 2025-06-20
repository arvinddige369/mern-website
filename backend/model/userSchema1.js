const mongoose = require('mongoose');

const userSchema1 = new mongoose.Schema({
    surname: {
        type:String,
        required:true
    },

    name: {
        type:String,
        required:true
    },

    f_name: {
        type:String,
        required:true
    },

    dob: {
        type:String,
        required:true
    },

    qualification: {
        type:Number,
        required:true
    },

    village: {
        type:String,
        required:true
    },

    cont_no: {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true
    },

    occupation: {
        type:String,
        required:true
    },

    profile: {
        type:String,
        required:true
    },

    member: {
        type:String,
        required:true
    },

    address: {
        type:String,
        required:true
    },

    others: {
        type:String,
        required:true
    },

    job: {
        type:String,
        required:true
    }


    

})

const User1 = mongoose.model('USER1', userSchema1);

module.exports = User1;