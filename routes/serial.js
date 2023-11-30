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
    let refL = req.params.serialId.split(",")
    let refLength = refL.length
    console.log(refL)
    if (refL.length == 1) {
        refL = req.params.serialId
        refLength = 1
    }

    executeCrudOperation("checkRefBySerial",ref,refL, refLength)
    .then(console.log("loading..."))
    .then((doc) => {
        console.log(doc)
        // res.send(doc)
        if (doc.length == 0) {
            res.send("Serial not found!")
            console.log("Serial not found!")
            console.log(doc.length)
        } else {
            res.send(doc);
            // console.log(typeof(doc));
            ref = doc
            console.log(ref)
        };
            })
    // doc = JSON.stringify(doc)
    
    // res.send(doc)
});






export default router;