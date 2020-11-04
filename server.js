require("dotenv").config();

require("./database/connect")((err, database) => {
    if (err) {
        throw err;
    }

    const express = require("./app")(database, jwt);
})

