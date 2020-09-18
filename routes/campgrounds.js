const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX Route
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.send(allCampgrounds);
        }
    });
});

// CREATE Route
router.post("/", (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user_id,
        username: req.body.username
    };

    let newCampground = {name: name, price: price, image: image, description: description, author: author}

    Campground.create(newCampground, (err, createdCampground) => {
        if(err) {
            console.log(err.message);
        } else {
            // res.redirect("/campgrounds");
            res.send(createdCampground)
        }
    });

});
// // EDIT Route
// router.get();
// // UPDATE Route
// router.put();
// // SHOW Route
// router.get();
// // DESTROY Route
// router.delete();

module.exports = router;