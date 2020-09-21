const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// ROOT Route
router.get("/", (req, res) => {
    res.send("Hello from the ROOT Route")
});

module.exports = router;