// const express = require("express")
// const mongoose = require("mongoose")
import mongoose from 'mongoose';
import express from 'express';
import serial from './routes/serial.js';

// import executeCrudOperation from './crudBackserver.js';




// import { executeCrudOperation } from './crudBackserver.js';

const app = express()
import dotenv from 'dotenv';

dotenv.config();

// await executeCrudOperation();

// app.use(express.json());
app.use("/serial", serial);

// async function connect() {
//     try {
//         await mongoose.connect(process.env.DB_URI)
//         console.log("connected to mongoDB")
//     } catch (error) {
//         console.log(error)
//     }
// };

// connect();

app.get("/", (req, res) => {
    res.send("home")
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
})