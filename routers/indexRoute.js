const express = require("express");
const router  = express.Router();

module.exports = () => {
    router.get("/", (req, res) => {
        // serve main page and login feature
    })

    router.get("/register", (req, res) => {
        // serve register page
    })

    return router;
}