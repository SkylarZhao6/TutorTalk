const { Binary } = require("bson");
const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    picture: Binary,
    program: String,
    subjects: [],
    about: String
})

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

module.exports = StudentProfile;