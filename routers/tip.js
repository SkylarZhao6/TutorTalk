const express = require("express");
const router = express.Router();

module.exports = (database, jwt) => {
    // check if role is tutor
    router.post("/rolecheck", (req, res) => {
        database.checkRole((err, result) => {
            if (result == null) {
                err ? res.send({ err: err }) : res.send({ role: null });
            } else {
                err ? res.send({ err: err }) : res.send({ role: result.role });
            }
        }, {
            id: req.user.user_id
        })
    })

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