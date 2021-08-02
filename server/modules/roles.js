const jwt = require('jsonwebtoken');
const User = require("../api/models/user");

exports.getRoles = (id) => {
    return User.findOne({_id: id})
    .select("roles")
    .exec()
    .then(data => {
        if(data != null){
            return data.roles
        }else{
            return "No vaild entry found for provided ID";
        }
    })
    .catch(err => {
        return err;
    });
};
exports.addRole = (id, role) => {
    return User.findOneAndUpdate({_id: id}, { $push: { roles: role } }, {new: true})
    .exec()
    .then(result => {
        return true;
    })
    .catch(err => {
        return err;
    });
};