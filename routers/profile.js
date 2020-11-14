const express = require("express");
const router = express.Router();

module.exports = (database) => {
    // student profile controllers
    router.post("/", (req, res) => {
        database.createStudentProfile((err, res) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send("Profile created");
        }, {
            student: req.user.student_id,
            picture: req.body.picture,
            program: req.body.program,
            helps: req.body.helps,
            about: req.body.about
        })
    })

    router.get("/view", (req, res) => {
        database.viewStudentProfile((err, profile) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send({ studentProfile: profile });
        }, {
            id: req.user.student_id
        })
    })
    return router;
}