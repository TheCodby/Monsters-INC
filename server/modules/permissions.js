const jwt = require('jsonwebtoken');

exports.getRoles = (token) => {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET)
    return userData.roles
};
