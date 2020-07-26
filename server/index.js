const express = require('express')
const app = express()
const port = 1217
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require ('./middleware/auth');
const { User } = require("./models/User");

//application/x--www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//app
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewurlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}) .then(() => console.log('MongoDB Connected...') )
    .catch(err => console.log(err))



    app.get('/', (req, res) => res.send('요한이 바보'))

    app.post('/api/users/register', (req, res) => {

        //회원 가입 할때 필요한 정보들을 client에서 가져오면
        //그것들을 데이터 베이스에 넣어준다.

        const user = new User(req.body)

        user.save((err, userInfo) => {
            if(err) return res.json({ success: false, err})
            return res.status(200).json({
                success: true
            })
            
        })
    })

    app.post('/api/users/login', (req, res) => {

        //이메일 search
        User.findOne({ email: req.body.email }, (err, user) => {
            if(!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당되는 유저가 없음"
                })
            }
         
        //이메일 데이터 베이스 존재 --> 비밀번호 확인

        user.comparePassword(req.body.password , (err, isMatch ) => {
            if(!isMatch)
            return res.json({ loginSuccess: false, message : "비번 틀림" })
        
        //비밀번호 correct --> token 생성
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            //  토큰을 저장한다. where? 쿠키, 로컬스트뤼쥐
            res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id })
        
            })
         })
     })
})


    //  role 1 =  어드민
    //  role 1 ≠  관리자

    app.get('/api/users/auth', auth , (req, res) => {

    
    //  여까지 오면 middleware 통과

    res.status(200).json({
        _id: req.user._id,
        idAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
      })
    })


    app.get('/api/users/logout', auth, (req, res) => {
        
        User.findOneAndUpdate({ _id: req.user._id },
            { token: "" }
             , (err, user) => {
                 if (err) return res.json({ success: false, err });
                 return res.status(200).send({
                     success: true
                 })
             })
    })







    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
