const express = require('express');
const router = express.Router();

require('../db/conn');
const User1 = require("../model/userSchema1");

router.get('/', (req, res) => {
    res.send("Hello world Form Sever router js");
});

router.post('/register1', (req, res) => {
    const { surname, name, f_name, dob, qualification, village, cont_no, email, occupation, profile, member, address, others, job } = req.body;
    if (!surname || !name || !f_name || !dob || !qualification || !village || !cont_no || !email || !occupation || !profile || !member || !address || !others || !job ) {
        return res.status(422).json({ error: "Please fill the Feild" });
    }

    User1.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "user alredy Exist" });
            }

            const user = new User1({ surname, name, f_name, dob, qualification, village, cont_no, email, occupation, profile, member, address, others, job });

            user.save().then(() => {
                res.status(201).json({ message: "User1 Register Sucssesfully" });
            }).catch((err) => res.status(500).json({ error: "failed to Register" }));
        }).catch(err => {console.log(err);});

    // res.json({ message:req.body });
    // res.send("Mera page")
});

module.exports = router;