const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

module.exports = (database, jwt) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());

    // user authentication endpoint
    const authRouter = require("./routers/auth")(database, jwt);
    app.use("/user", authRouter);

    // user profile endpoint
    const profileRouter = require("./routers/profile")(database, jwt);
    app.use("/profile", jwt.verifyToken, profileRouter);

    app.get("*", (req, res) => {
        res.send("error");
    })

    return app;
};
