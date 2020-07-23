const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
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

userSchema.pre('save', function( next ) {

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
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainpassword, cb) {

    //plainPassword 1234567      암호화된 비번:$2b$10$EXZvSmrW2GCJElr6WjHPhOyTwO6WFoXtqsl3QsdracWZSxtXby7tG
    bcrypt.compare(plainpassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch) 
    })
}

userSchema.methods.generateToken = function (cb) {

    var user = this;

    //jsonwebtocken을 이용해서tocken을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //  user._id + 'secretToken' = Token 
    //  ->
    //  'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //  토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //  유저 아이디를 이용해서 유저를 찾고
        //  클라이언트에서 가져온 token과 db에 보관된 일치 확인

        user.findOne({ "_id": decoded, "token": token}, function (err, use) {
            if (err) return cb(err);
            cb(null, user)
        })
     })

}


const User = mongoose.model('user',userSchema)

module.exports = { User }