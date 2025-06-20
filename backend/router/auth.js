const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send("Hello world Form Sever router js");
});

router.post('/register', (req, res) => {
    const { F_name, Dob, Qualification, S_name, Cont_no, Email, Profile, Address, Jobnew1, JobNew } = req.body;
    if (!F_name || !Dob || !Qualification || !S_name || !Cont_no || !Email || !Profile || !Address || !Jobnew1 || !JobNew) {
        return res.status(422).json({ error: "Please fill the Feild" });
    }

    User.findOne({ Email: Email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "user alredy Exist" });
            }

            const user = new User({ F_name, Dob, Qualification, S_name, Cont_no, Email, Profile, Address, Jobnew1, JobNew });

            user.save().then(() => {
                res.status(201).json({ message: "User Register Sucssesfully" });
            }).catch((err) => res.status(500).json({ error: "failed to Register" }));
        }).catch(err => {console.log(err);});

    // res.json({ message:req.body });
    // res.send("Mera page")
});

module.exports = router;