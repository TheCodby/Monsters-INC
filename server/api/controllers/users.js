const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const protectedFields = [];

exports.users_get_all = (req, res, next) => {
    User.find()
    .select("username email created roles")
    .exec()
    .then(data => {
        response = {
            count: data.length,
            users: data.map(d => {
                return {
                    id: d._id,
                    username: d.username,
                    created: d.created,
                    roles: d.roles,
                    request: {
                        method: "GET",
                        url: `${process.env.rootURL}:${process.env.PORT}/users/${d._id}`
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
exports.users_delete_one = (req, res, next) =>{
    const id = req.params.userId;
    User.findOneAndRemove({_id: id})
    .exec()
    .then(result => {
        if(result != null){
            res.status(200).json({
                message: "User deleted!",
                request: {
                    method: "DELETE",
                    url: `${process.env.rootURL}:${process.env.PORT}/users/${id}`
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