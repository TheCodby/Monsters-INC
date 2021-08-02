const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: { type: String, required: true},
    email: { type: String, 
    required: true, 
    unique: true},
    password: { type: String, required: true},
    created: { type: Date, default: Date.now },
    roles: { type : Array , default: ["member"] },
}, {collection: 'users', autoCreate: true})

const User = mongoose.model("User", userSchema);

module.exports = User;