require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const StudentProfile = require("./models/studentProfile");

module.exports = function (connected) {
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
            const Student = require("./models/student");
            const studentProfile = require("./models/studentProfile");
            const Tip = require("./models/tip");
            const Tutor = require("./models/tutor");
            const TutorProfile = require("./models/tutorProfile");

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

            // validate a tutor or student user
            function getStudentOrTutor(callback, input) {
                // try student database first
                Student.findOne({ email: input.email }, (err, student) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    if (student == null) {
                        // try tutor database
                        Tutor.findOne({ email: input.email }, (err, tutor) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            if (input.password && tutor) {
                                bcrypt.compare(input.password, tutor.password, (err, same) => {
                                    if (err) {
                                        callback(err);
                                        return;
                                    }
                                    return callback(null, same ? tutor : null);
                                });
                                return;
                            }
                            return callback(null, tutor);
                        })
                        return;
                    }
                    if (input.password && student) {
                        bcrypt.compare(input.password, student.password, (err, same) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            return callback(null, same ? student : null);
                        });
                        return;
                    }
                    return callback(null, student);
                })
            }

            function createStudentProfile(callback, { student, picture, program, helps, about }) {
                studentProfile.create(
                    {
                        student: student,
                        picture,
                        program,
                        helps,
                        about
                    }, (err, res) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        const profile = res;
                        profile.id = profile._id;
                        callback(null, profile);
                    })
            }

            function viewStudentProfile(callback, student) {
                StudentProfile.findOne({ student: student.id }, (err, res) => {
                    err ? callback(err, null) : callback(null, res);
                });
            }

            connected(null, {
                createStudent,
                createTutor,
                getStudentOrTutor,
                createStudentProfile,
                viewStudentProfile
            })
        }
    )
}