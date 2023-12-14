import express from 'express';
let router = express.Router();

import { executeCrudOperation } from '../crudBackserver.js';

router.use(function (req, res, next) {
    console.log(req.url, Date.now())
    next();
})

// A COMMENT TO TRY GIT STASH


router.route("/check")
.get((req, res) => {
    res.send("enter the detailed info")
});

var ref;

router.route("/add/:ref/:serialId")
.get((req, res) => {
    // console.log(req.params.ref, "hiiiii+", req.params.serialId)
    let ref = req.params.ref
    let serialL = req.params.serialId.split(",")
    let serialLength = serialL.length
    console.log(serialL)
    executeCrudOperation("add", ref, serialL, serialLength)
    .then(console.log("loading..."))
    .then((doc) => {
        console.log(doc);
        res.send(doc);
    })
})

router.route("/drop/:ref/:serialId")
.get((req, res) => {
    let ref = req.params.ref
    let serialL = req.params.serialId.split(",")
    let serialLength = serialL.length
    console.log(serialL)
    executeCrudOperation("drop", ref, serialL, serialLength)
    .then(console.log("loading..."))
    .then((doc)=> {
        console.log(doc);
        res.send(doc);
    })
})

router.route("/check/:serialId")
.get((req, res) => {
    // res.send("your serial input: " + req.params.serialId);
    let serialL = req.params.serialId.split(",")
    let serialLength = serialL.length
    // console.log(serialL)
    if (serialL.length == 1) {
        serialL = req.params.serialId
        serialLength = 1
    }

    executeCrudOperation("checkRefBySerial",ref,serialL, serialLength)
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


router.route("/checkAllSerial/:ref")
.get((req,res) => {
    let ref = req.params.ref
    executeCrudOperation("checkSerialByRef", ref)
    .then(console.log("loading..."))
    .then((doc) => {
        console.log(doc);
        if (doc.length == 0) {
            res.send("ref not found!")
            console.log("ref not found!")
            console.log(doc.length)
        } else {
            res.send(doc);
            // console.log(typeof(doc));
            ref = doc
            console.log(ref)
        };
    })
})





export default router;