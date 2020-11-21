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
    app.use("/", authRouter);

    // user profile endpoint
    const profileRouter = require("./routers/profile")(database, jwt);
    app.use("/profile", jwt.verifyToken, profileRouter);

    // tips endpoint
    const tipRouter = require("./routers/tip")(database, jwt);
    app.use("/tips", jwt.verifyToken, tipRouter);

    // search tutors endpoint
    const searchRouter = require("./routers/search")(database, jwt);
    app.use("/search", jwt.verifyToken, searchRouter);

    // app.get("*", (req, res) => {
    //     res.send("error");
    // })

    return app;
};
