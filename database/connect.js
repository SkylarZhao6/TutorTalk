require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");

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

            // import documents from database
            const Student       = require("./models/student");
            const studentProfile = require("./models/studentProfile");
            const Tip            = require("./models/tip");
            const Tutor          = require("./models/tutor");
            const TutorProfile   = require("./models/tutorProfile");

            // queries to database
            // insert a new student user
            function createStudent(callback, info) {
                bcrypt.hash(info.password, 12, (err, hashed) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    info.password = hashed;

                    Student.create(info, (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const student = res;
                        delete student.password;
                        student.id = student._id;
                        callback(null, student);
                    });
                });
            }

            // validate a student user
            function getStudent(callback, input) {
                Student.findOne({ email: input.email }, (err, student) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (input.password && student) {
                        bcrypt.compare(input.password, student.password, (err, same) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            callback(null, same ? student: null);
                            return;
                        });
                        return;
                    }       
                    callback(null, student);
                });
            }

            // insert a new tutor user
            function createTutor(callback, info) {
                bcrypt.hash(info.password, 12, (err, hashed) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    info.password = hashed;

                    Tutor.create(info, (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const tutor = res;
                        delete tutor.password;
                        tutor.id = tutor._id;
                        callback(null, tutor);
                    });
                });
            }

            // validate a tutor user
            function getTutor(callback, input) {
                Tutor.findOne({ email: input.email }, (err, tutor) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (input.password && tutor) {
                        bcrypt.compare(input.password, tutor.password, (err, same) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            callback(null, same ? tutor : null);
                            return;
                        });
                        return;
                    }       
                    callback(null, tutor);
                });
            }

            connected(null, {
                createStudent,
                getStudent,
                createTutor,
                getTutor
            })
        }
    )
}