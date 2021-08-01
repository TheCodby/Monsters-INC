const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
const bcrypt = require('bcrypt');
const protectedFields = [];

exports.account_get_all = (req, res, next) => {
    Account.find()
    .select("username email created roles")
    .exec()
    .then(data => {
        response = {
            count: data.length,
            accounts: data.map(d => {
                return {
                    id: d._id,
                    username: d.username,
                    email: d.email,
                    created: d.created,
                    roles: d.roles,
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