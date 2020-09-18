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

const campgroundRoutes = require("./routes/campgrounds");

app.use("/campgrounds", campgroundRoutes);

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { console.log("Connected to DB!")})
.catch((err) => {console.log(err.message)});


app.listen(process.env.PORT, () => {
    console.log("App is running on port: " + process.env.PORT);
})