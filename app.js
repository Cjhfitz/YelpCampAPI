const express = require("express"),
      app = express(),
      dotenv = require("dotenv"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      
      mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      
      passport = require("passport"),
      LocalStrategy = require("passport-local");

dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello from root route");
})


app.listen(process.env.PORT, () => {
    console.log("App is running on port: " + process.env.PORT);
})