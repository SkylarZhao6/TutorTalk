const mongoose = require("mongoose");

const tutorProfileSchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutor"
    },
    name: String,
    picture: String,
    subject: String,
    job: String,
    diploma: String,
    availabilities: String,
    about: String
})

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;