const { User } = require('../models/User');


let auth = (req, res, next) => {


    //  인증 하는곳 

    //  클라에서 쿠키 운반
    let token = req.cookies.x_auth;

    //  토큰 복호화 유저 search 
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })

    //  유저가 있으면 인증 ㅇ

    //  유저가 없으면 인증 N


}



module.exports = { auth };