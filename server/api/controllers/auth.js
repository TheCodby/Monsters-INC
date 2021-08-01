const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
const validation = require('../../modules/validation')
const bcrypt = require('bcrypt');
const protectedFields = [];


exports.accounts_register = async (req, res, next) => {
    //Validation
    const { error } = await validation.registerValidation(req.body);
    if (error) { 
        return res.status(500).json({
            error: error.details[0].message
        })
    }
    Account.find({'email':req.body.email})
    .exec()
    .then(account => {
        if(account.length >= 1)
        {
            res.status(409).json({
                message: "Username Or E-mail exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // Store hash in your password DB.
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const account = new Account({
                        _id: mongoose.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                    })
                    account.save()
                    .then(result => {
                        createdAccount = {
                            id: result._id,
                            username: result.username,
                            email: result.email,
                            request: {
                                method: "GET",
                                url: `${process.env.rootURL}:${process.env.PORT}/accounts/${result._id}`
                            }
                        }
                        res.status(201).json({
                            message: "Created account successfully!",
                            account: createdAccount
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}
exports.accounts_login = async (req, res, next) => {
    const { error } = await validation.loginValidation(req.body);
    if (error) { 
        return res.status(500).json({
            error: error.details[0].message
        })
    }
    const email = req.body.email;
    const password = req.body.password;
    Account.findOne({email: email})
    .exec()
    .then(account => {
        if(account.length < 1)
        {
            return res.status(401).json({
                message: 'Auth failed'
            })
        } else {
            bcrypt.compare(password, account.password, function(err, result) {
                if(err)
                {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if(result)
                {
                    const token = jwt.sign({
                        _id: account._id,
                        },
                        process.env.TOKEN_SECRET, {
                            expiresIn: "1h",
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}