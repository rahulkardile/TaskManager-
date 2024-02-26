import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import User from "./Routes/UserRoutes.js"
import TodoList from "./Routes/TodoRoutes.js"
const app = express();

app.use(cookieParser());
app.use(express.json());

dotenv.config();
const PORT = 3300
const MONGO_URL = process.env.MONGOURL

try {
    mongoose.connect(MONGO_URL)
    .then(()=> console.log('Database is connected'))
} catch (error) {
console.log('Database is error ' + error);     
}

app.use("/api/user/", User )
app.use("/api/todos/", TodoList)

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 400;
    
    if(err.code === '11000') return err.message = "user already exist!"
    let message = err.message || 'Internal Server Error';
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} . . .`);
})