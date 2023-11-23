// const express = require("express")
// const mongoose = require("mongoose")


import { executeCrudOperation } from './crud.js';

// const app = express()
import { config } from 'dotenv';

config();

await executeCrudOperation();



// async function connect() {
//     try {
//         await mongoose.connect(uri)
//         console.log("connected to mongoDB")
//     } catch (error) {
//         console.log(error)
//     }
// }

// connect();

// app.listen(8000, () => {
//     console.log("Server started on port 8000");
// })