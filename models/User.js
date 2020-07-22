const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: String,
        default: 0
    },
        image: String,
    tocken: {
         type: String
        },
    tockenexp: {
        type: Number
    }
})

const User = mongoose.model('user',userschema)

module.exports = { User }