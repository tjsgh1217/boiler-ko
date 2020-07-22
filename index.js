const express = require('express')
const app = express()
const port = 1217


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seonho:a382214160@boilerplate.cas3u.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    usenewurlparser: true, useunifiedtopology: true, usecreateindex: true, usefindandmodify: false
}) .then(() => console.log('mongodb connected...') )
    .catch(err => console.log(err))


    app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
