const express = require('express')
const app = express()
const port = 1217
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x--www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//app
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seonho:a382214160@boilerplate.cas3u.mongodb.net/test?retryWrites=true&w=majority', {
    useNewurlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}) .then(() => console.log('MongoDB Connected...') )
    .catch(err => console.log(err))



    app.get('/', (req, res) => res.send('Hello World!'))

    app.post('/register', (req, res) => {

        //회원 가입 할때 필요한 정보들을 client에서 가져오면
        //그것들을 데이터 베이스에 넣어준다.

        const user = new User(req.body)

        user.save((err, userInfo) => {
            if(err) return res.json({ sucess: false, err})
            return res.status(200).json({
                sucess: true
            })
            
        })
    })


    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
