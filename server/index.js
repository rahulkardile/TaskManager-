import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from "cors"

import User from "./Routes/UserRoutes.js"
import PostList from "./Routes/POstRoutes.js"
const app = express();
app.use(cors());
app.use(cookieParser());

// for getting json data
app.use(express.json());
const __dirname = path.resolve();

// for getting form data
app.use(express.urlencoded({ extended: false }));

dotenv.config();
const PORT = 3300
const MONGO_URL = process.env.MONGOURL

try {
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Database is connected'))
} catch (error) {
    console.log('Database is error ' + error);
}

app.use('/uploads', express.static('uploads'))
app.use("/api/user/", User)
app.use("/api/post/", PostList)

app.use(express.static(path.join(__dirname, "../client")))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400;

    if (err.code === '11000') return err.message = "user already exist!"
    let message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} . . .`);
})