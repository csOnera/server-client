import express from 'express';
let router = express.Router();

import { executeCrudOperation } from '../crudBackserver.js';

router.use(function (req, res, next) {
    console.log(req.url, Date.now())
    next();
})


router.route("/check")
.get((req, res) => {
    res.send("enter the serialid after check")
});

var ref;

router.route("/check/:serialId")
.get((req, res) => {
    // res.send("your serial input: " + req.params.serialId);
    executeCrudOperation(req.params.serialId)
    .then(console.log("loading..."))
    .then((doc) => {
        console.log(doc)
        res.send(doc)
        // if (doc.length == 0) {
        //     res.send("Serial not found!")
        //     console.log("Serial not found!")
        //     console.log(doc.length)
        // } else {
        //     res.send(doc);
        //     // console.log(typeof(doc));
        //     ref = doc[0]['ref']
        //     console.log(ref)
        // };
            })
    // doc = JSON.stringify(doc)
    
    // res.send(doc)
});






export default router;