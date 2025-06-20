const mongoose = require('mongoose');

const userSchema_new = new mongoose.Schema({

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
        type:Date,
        required:true
    },

    qualification: {
        type:String,
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
    },
    file_up:{
        type:String,
        require:true
    },
    isDeleted: { type: Boolean, default: false }

})

const User1 = mongoose.model('USER1', userSchema_new);

module.exports = User1;