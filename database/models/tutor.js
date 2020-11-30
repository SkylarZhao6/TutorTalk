const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String
})

const Tutor = mongoose.model("Tutor", tutorSchema);

module.exports = Tutor;