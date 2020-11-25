const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String
})

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;