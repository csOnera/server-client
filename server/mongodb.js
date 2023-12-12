import mongoose from 'mongoose';
import express from 'express';
import serial from './routes/serial.js';
import cors from "cors";

const app = express()
import dotenv from 'dotenv';

dotenv.config();


app.use(cors());

// router
app.use("/serial", serial);


app.get("/", (req, res) => {
    res.send("home")
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
})
