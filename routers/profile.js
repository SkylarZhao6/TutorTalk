const express = require("express");
const router = express.Router();
const AWS = require("../middleware/photo_upload");

const singleUpload = AWS.upload.single("image");

module.exports = (database, jwt) => {
    // student profile controllers
    // create student profile
    router.post("/student/create", singleUpload, (req, res) => {
        console.log(req.body.picture);

        database.createStudentProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            return res.send("Profile created.");
        }, {
            student: req.user.user_id,
            picture: req.body.picture,
            program: req.body.program,
            about: req.body.about
        })
    })

    // view student own profile
    router.get("/student", (req, res) => {
        database.viewStudentProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send({ studentProfile: profile });
        }, {
            id: req.user.user_id
        })
    })

    // tutor profile controllers
    // create tutor profile
    router.post("/tutor/create", (req, res) => {
        database.createTutorProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            return res.send("Profile created.");
        }, {
            tutor: req.user.user_id,
            picture: req.body.picture,
            subject: req.body.subject,
            job: req.body.job,
            diploma: req.body.diploma,
            availabilities: req.body.availabilities,
            about: req.body.about
        })
    })

    // view tutor own profile
    router.get("/tutor", (req, res) => {
        database.viewTutorProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send({ tutorProfile: profile });
        }, {
            id: req.user.user_id
        })
    })

    // view a tutor's profile
    router.get("/view/:id", (req, res) => {
        database.viewTutorProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send({ tutorProfile: profile });
        }, {
            id: req.params.id
        })
    })

    return router;
}