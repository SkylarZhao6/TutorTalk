const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// cors origins
var allowlist = ['http://localhost:3000', 'https://tutor-talk.vercel.app']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = (database, jwt) => {
    app.use(cors(corsOptionsDelegate));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());

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
