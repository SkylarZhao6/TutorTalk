const express = require("express");
const router  = express.Router();

module.exports = (database, jwt) => {
    // student log in 
    router.post("/login", (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);

        database.getStudent(
            (err, user) => {
                if (err) {
                    return res.send({ err: err });
                }
                // when user enter wrong email or password
                if (!user) {
                    return res.send({ err: "Incorrect email or password!" })
                }
                
                const token = jwt.generateToken({
                    email,
                    user_id: user._id,
                });
                return res.send({ userToken: token });
            },
            { email, password }
        );
    });

    //student user registration
    router.post("/register/student", (req, res) => {
        // console.log(req.body);
        // check if the email exists first
        database.getStudent(
            (err, user) => {
                if (err) {
                    return res.send({ err: err });
                }
                // when the email exists in the database
                if (user) {
                    return res.send({ err: "This email has already been used."})
                }

                // create the student user
                database.createStudent(
                    (err, user) => {
                        if (err) {
                            return res.send({ err: err });
                        }
                        const token = jwt.generateToken({
                            email: user.email,
                            user_id: user.id,
                        });
                        res.cookie("JWT", { token: token });
                        res.send("Successfully registered.");
                    },
                    {
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        phonenumber: req.body.phoneNumber
                    }
                );
            },
            { email: req.body.email }
        );
    });

    // log tutor user in
    // may change the endpoint later...
    router.post("/", (req, res) => {
        const { email, password } = req.body;
        database.getTutor(
            (err, user) => {
                if (err) {
                    // error page
                    // res.render("error");
                    return;
                }
                if (!user) {
                    // main page
                    res.render("", {
                        msg: "Incorrect email or password!",
                    });
                    return;
                }
                const token = jwt.generateToken({
                    email,
                    user_id: user._id,
                });
                res.cookie("JWT", { token: token });
                res.redirect("/profile");
            },
            { email, password }
        );
    });

    //tutor user registration
    router.post("/register/tutor", (req, res) => {
        // check if the email exists
        database.getTutor(
            (err, user) => {
                if (err) {
                    // error page
                    // res.render("error");
                    return;
                }
                if (user) {
                    // serve register page
                    res.render("signup", {
                        msg: "Email has been taken",
                    });
                    return;
                }
                console.log(req.body);

                // create the tutor user
                database.createTutor(
                    (err, user) => {
                        if (err) {
                            // error page
                            // res.render("error");
                            return;
                        }
                        const token = jwt.generateToken({
                            email: user.email,
                            user_id: user.id,
                        });
                        res.cookie("JWT", { token: token });
                        res.redirect("/register/tutor/screen");
                    },
                    {
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        phonenumber: req.body.phoneNumber
                    }
                );
            },
            { email: req.body.email }
        );
    });

    // log user out
    router.get("/logout", (req, res) => {
        res.clearCookie("JWT");
        res.status(204).redirect("/");
    });

    return router;
};
