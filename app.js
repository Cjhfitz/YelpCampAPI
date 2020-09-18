const express = require("express"),
      app = express(),
      dotenv = require("dotenv"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      
      mongoose = require("mongoose"),
      
      passport = require("passport"),
      LocalStrategy = require("passport-local");

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { console.log("Connected to DB!")})
.catch((err) => {console.log(err.message)});


app.listen(process.env.PORT, () => {
    console.log("App is running on port: " + process.env.PORT);
})