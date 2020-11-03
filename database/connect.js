require("dotenv").config();
const mongoose = require("mongoose");

module.exports = function(connected) {
    // connect to mongodb
    mongoose.connect(
        process.env.DBURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                connected(err);
                return;
            } else {
                console.log("Connected to Mongo: " + mongoose.version);
            }
        }
    )

    // import documents from database
    const Student        = require("./models/student");
    const StudentProfile = require("./models/studentProfile");
    const Tip            = require("./models/tip");
    const Tutor          = require("./models/tutor");
    const TutorProfile   = require("./models/tutorProfile");
}