const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true},
    email: { type: String, 
    required: true, 
    unique: true, 
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: { type: String, required: true},
}, {collection: 'accounts', autoCreate: true})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;