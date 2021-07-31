const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
}, {collection: 'accounts', autoCreate: true})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;