const jwt = require('jsonwebtoken');
const roles = require('../../modules/roles')
const rolesName = ["member"]

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.userData = decoded
    const userRoles = await roles.getRoles(req.userData._id);
    let hasPerm = false;
    for(const role of userRoles)
    {
        if(rolesName.includes(role))
        {
            hasPerm = true
            break;
        }
    }
    if(hasPerm)
        next();
    else
    {
        return res.status(401).json({
            message: "Access denied",
        }) 
    }
};