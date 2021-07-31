const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true},
    rate: { type: Number, default: 0},
    employerImage: { type: String}
}, {collection: 'employees', autoCreate: true})

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;