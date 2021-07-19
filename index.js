require('dotenv').config()
const cors = require('cors')
const user = require('./routes/users')
const auth = require('./routes/auth')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users',user)
app.use('/api/auth',auth)

mongoose.connect('mongodb://localhost/userData')
 .then(()=>console.log('Connected successfully to mongodb'))
 .catch(err=>console.log('Does not connected to mongodb'))

const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Listening to port number ${port}...`);
})
