import express from 'express'
import dotenv from 'dotenv'
import { rootRouter } from './src/routes/index.js'
import connectDB from './src/database/index.js'
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors'
dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});


connectDB()
app.use(rootRouter)
app.listen(process.env.PORT, () => {
    console.log('App is running on ' + process.env.PORT)
})
