const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router)

const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

if (process.env.NODE_ENV === 'prod') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'wedding-client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'wedding-client/build', routesHandler));
    });
}

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})