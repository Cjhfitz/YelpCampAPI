const express = require("express"),
      app = express(),
      dotenv = require("dotenv"),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      cors = require("cors"),
      
      mongoose = require("mongoose"),
      User = require("./models/user"),
      
      passport = require("passport"),
      LocalStrategy = require("passport-local")

      appError = require('./util/AppError');

dotenv.config();

app.use(cors());

/**
 * app.use(bodyParser.urlencoded({extended: true}));
 *  tells the application to use a urlencoded body parser with the request property
 *  when recieving urlencoded bodies.
 * 
 * bodyParser.urlencoded({extended: true})
 *  Returns middleware that handles urlencoded bodies. Only look at requests where the 
 *  Content-type header matches the type option.
 * 
 * This parser only accepts UTF-8 encoding of the body.
 */
app.use(bodyParser.urlencoded({extended: true}));


/**
 * app.use(bodyParser.json());
 *  tells the application to use a json parser with the request property when recieving
 *  request containing json in the body.  Only look at requests where the 
 *  Content-type header matches the type option.
 * 
 * bodyParser.json()
 *  returns middleware for handling json
 */
app.use(bodyParser.json());

// allows us to use put and delete verbs where the client may not support them (forms)
app.use(methodOverride("_method"));

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

app.use((err, req, res, next) => {
    res.send("Something went wrong!!!")
})

app.listen(process.env.PORT, () => {
    console.log("App is running on port: " + process.env.PORT);
});