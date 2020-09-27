const express = require("express"),
      app = express(),
      dotenv = require("dotenv"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      cors = require("cors"),
      
      mongoose = require("mongoose"),
      User = require("./models/user"),
      
      passport = require("passport"),
      LocalStrategy = require("passport-local");

dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.use(methodOverride("_method"));

app.use(cors());

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index")

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { console.log("Connected to DB!")})
.catch((err) => {console.log(err.message)});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);



app.listen(process.env.PORT, () => {
    console.log("App is running on port: " + process.env.PORT);
});