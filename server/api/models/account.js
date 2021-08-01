const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true},
    email: { type: String, 
    required: true, 
    unique: true},
    password: { type: String, required: true},
    created: { type: Date, default: Date.now },
    roles: { type : Array , "default" : ["member"] },
}, {collection: 'accounts', autoCreate: true})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;