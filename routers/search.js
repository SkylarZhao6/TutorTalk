const express = require("express");
const router = express.Router();

module.exports = (database, jwt) => {
    // search tutors by subjects keyword
    router.post("/", (req, res) => {
        database.searchTutor(
            (err, tutors) => {
                if (err) {
                    return res.send({ err: err });
                }
                res.send({ tutors: tutors });
            },
            {
                subject: req.body.subject,
            }
        );
    });

    return router;
}