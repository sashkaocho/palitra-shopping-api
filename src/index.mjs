import express from 'express'
import mongoose from "mongoose";

const app = express()

const PORT = 3000

mongoose.connect("mongodb+srv://admin:Password1!@palitra-shop.lpkqpmf.mongodb.net/?retryWrites=true&w=majority&appName=palitra-shop")
    .then(() => {
        app.listen(PORT, () => {
            console.log('server is running')
        })
        console.log('connected')
    }).catch(() => {
    console.log('err')
})
