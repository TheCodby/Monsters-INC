const express = require("express");
const mongoose = require("mongoose");
const Account = require("../models/Account");
const router = express.Router();

router.post('/register', async (req, res, next) => {
    const account = new Account({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    account.save()
    .then(result => {
        createdAccount = {
            id: result._id,
            username: result.username,
            email: result.email,
            request: {
                method: "GET",
                url: `${process.env.rootURL}/account/${result._id}`
            }
        }
        res.status(201).json({
            message: "Created account successfully!",
            account: createdAccount
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})
router.post('/login', async (req, res, next) => {
    
})

module.exports = router