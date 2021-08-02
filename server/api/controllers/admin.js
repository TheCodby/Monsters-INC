const mongoose = require("mongoose");
const User = require("../models/user");
const protectedFields = [];

exports.get_all_users = (req, res, next) => {
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
                    email: d.email,
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