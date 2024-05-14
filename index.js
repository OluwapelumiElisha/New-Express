require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(morgan('dev'))
app.use(express.json())
//  it allow u to get data from backend
app.use(cors())


const userRoute = require('./src/router/User')
const blogroute = require('./src/router/Blog')
const productroute = require('./src/router/Product')
const imageUploadRoute = require('./src/router/UploadImage')
const signUpRoute = require('./src/router/Auth')



const mongoApiconnect = process.env.mongoURL
app.use(productroute)
app.use(userRoute)
app.use(blogroute)
app.use(imageUploadRoute)
app.use(signUpRoute)




const start = async ()=>{
    try {
        const conn = await mongoose.connect(mongoApiconnect)
        console.log('Connected to DB');
        if (conn) {
        app.listen(4002, 'localhost', ()=>{
        console.log('Hello World am running on this port');
    })
        }
    } catch (error) {
        console.log(error);
    }
}
start()