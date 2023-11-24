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
    res.send("your serial input: " + req.params.serialId);
    executeCrudOperation(req.params.serialId)
    .then((doc) => {
        // res.send(JSON.stringify(doc));
        console.log(doc);
        ref = doc[0]['ref']
        console.log(ref)

    })
    // doc = JSON.stringify(doc)
    
    // res.send(doc)
});






export default router;