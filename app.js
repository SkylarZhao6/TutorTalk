const express = require("express");
const app = express();

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // user authentication endpoint
    const authRouter = require("./routers/auth")(database, jwt);
    app.use("/user", authRouter);

    app.get("/",(req,res)=>{
        res.send("halo wor")
    })
    app.get("*", (req, res) => {
        // serve error page
        res.render("error");
    })

    return app;
};
