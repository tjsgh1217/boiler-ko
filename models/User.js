const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

userschema.pre('save', function( next ) {

    var user = this;
    if (user.isModified('password')) {
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password ,salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
             })
         })
    }
})


const User = mongoose.model('user',userschema)

module.exports = { User }