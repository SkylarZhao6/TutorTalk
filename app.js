const express = require("express");
const app = express();

module.exports = (database, jwt) => {
    // serve static front-end code
    app.use(express.static("Public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // serve auth pages
    const authRoute = require("./routers/authRoute")(database, jwt);
    app.use("/user", authRoute);

    app.get("/",(req,res)=>{
        res.send("halo wor")
    })
    app.get("*", (req, res) => {
        // serve error page
        res.render("error");
    })

    return app;
};
