const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// ROOT Route
router.get("/", (req, res) => {
    res.send("Hello from the ROOT Route")
});

//////////////// 
// AUTH ROUTES
////////////////

router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds")
        });
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: ""
    })
);

// Logout Logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;