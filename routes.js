/* required external modules */

const express = require("express");
const User = require('./models');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./auth');

require("dotenv").config();

/* Routes Defination */

/* saving Auth0 signup data in mongodb */

router.post('/signup', (req, res, next) => {
    
        User.create({
            name:req.body.name,
            email:req.body.email,
            profileimage:req.body.picture,
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token:token });
        }).catch(next);
    });
/* getting User data by id */

router.get('/myprofile', auth.verifyUser, (req, res, next)=>{


    res.json({
        _id: req.user._id, name: req.user.name, phone: req.user.phone,
        address: req.user.address, email: req.user.email, profileimage: req.user.profileimage,
        
    });
     
    

})

/* upadting user profile */

router.put('/myprofile', auth.verifyUser, (req, res, next)=>{
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json(user);

        }).catch(next);

     
    

})


    

/* Updating user profile */


module.exports = router;
