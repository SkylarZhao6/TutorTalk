const { Binary } = require("bson");
const mongoose = require("mongoose");

const tutorProfileSchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor"
    },
    picture: Binary,
    role: String,
    job: String,
    diploma: String,
    phonenumber: Number,
    availabilities: String,
    about: String
})

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;