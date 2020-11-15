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
            const StudentProfile = require("./models/studentProfile");
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

            // insert student profile
            function createStudentProfile(callback, { student, picture, program, helps, about }) {
                StudentProfile.create(
                    {
                        student,
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

            // get student profile from db
            function viewStudentProfile(callback, student) {
                const student_id = new mongoose.Types.ObjectId(student.id);
                StudentProfile.findOne({ student: student_id }, (err, profile) => {
                    err ? callback(err, null) : callback(null, profile);
                });
            }

            // insert tutor profile
            function createTutorProfile(callback, { tutor, picture, role, job, diploma, availabilities, about }) {
                TutorProfile.create(
                    {
                        tutor,
                        picture,
                        role,
                        job,
                        diploma,
                        availabilities,
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

            // get tutor profile from db
            function viewTutorProfile(callback, tutor) {
                const tutor_id = new mongoose.Types.ObjectId(tutor.id);
                TutorProfile.findOne({ tutor: tutor_id }, (err, profile) => {
                    err ? callback(err, null) : callback(null, profile);
                });
            }

            connected(null, {
                createStudent,
                createTutor,
                getStudentOrTutor,
                createStudentProfile,
                viewStudentProfile,
                createTutorProfile,
                viewTutorProfile
            })
        }
    )
}