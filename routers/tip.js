const express = require("express");
const router = express.Router();

module.exports = (database, jwt) => {
    // tutors add a new tip
    router.post("/add", (req, res) => {
        database.createTip((err, tip) => {
            if (err) {
                return res.send({ err: err });
            }
            return res.send("A new tip created.");
        }, {
            tutor: req.user.user_id,
            subject: req.body.subject,
            content: req.body.content
        })
    })

    // view all the tips
    router.get("/", (req, res) => {
        database.viewTips((err, tips) => {
            if (err) {
                return res.send({ err: err });
            }
            res.send({ allTips: tips });
        })
    })

    return router;
}