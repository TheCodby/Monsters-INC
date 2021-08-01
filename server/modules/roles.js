const jwt = require('jsonwebtoken');
const Account = require("./api/model/account");

exports.getRoles = (token) => {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET)
    return userData.roles
};
exports.addRole = (id, role) => {
    Account.findOneAndUpdate({_id: id}, { $push: { roles: role } }, {new: true})
    .exec()
    .then(result => {
        return true;
    })
    .catch(err => {
        return err;
    });
};