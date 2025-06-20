const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    F_name: {
        type: String,
        required: true
    },

    Dob: {
        type: String,
        required: true
    },

    Qualification: {
        type: String,
        required: true
    },

    S_name: {
        type: String,
        required: true
    },

    Cont_no: {
        type: Number,
        required: true
    },

    Email: {
        type: String,
        required: true
    },

    Profile: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: true
    },

    Jobnew1: {
        type: String,
        required: true
    },

    JobNew: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: { type: Boolean, default: false }

})

const User = mongoose.model('USER', userSchema);

module.exports = User;