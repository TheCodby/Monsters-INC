const Employer = require("../models/Account");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
const bcrypt = require('bcrypt');
const protectedFields = [];

exports.account_get_all = (req, res, next) => {
    Account.find()
    .select("username email")
    .exec()
    .then(data => {
        response = {
            count: data.length,
            accounts: data.map(d => {
                return {
                    id: d._id,
                    username: d.username,
                    email: d.email,
                    request: {
                        method: "GET",
                        url: `${process.env.rootURL}:${process.env.PORT}/accounts/${d._id}`
                    }
                }
            })
        }
        if(data.length >= 0)
        {
            res.status(200).json(response)
        } else {
            res.status(401).json({
                message: "No entries found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}
exports.accounts_register = (req, res, next) => {
    Account.find({$or:[{'username':req.body.username}, {'email':req.body.email} ]})
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
exports.accounts_delete_one = (req, res, next) =>{
    const id = req.params.accountId;
    Account.findOneAndRemove({_id: id})
    .exec()
    .then(result => {
        if(result != null){
            res.status(200).json({
                message: "Account deleted!",
                request: {
                    method: "DELETE",
                    url: `${process.env.rootURL}:${process.env.PORT}/accounts/${id}`
                }
            })
        } else {
            res.status(401).json({
                message: "No entries found"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}
exports.accounts_login = (req, res, next) => {
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
                        email: result.email,
                        accountId: result._id,
                        },
                        process.env.JWT_KEY, {
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