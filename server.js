const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('hii')
})

app.listen(3000, () => {
    console.log(`Node API app is running on port 3000`)
})