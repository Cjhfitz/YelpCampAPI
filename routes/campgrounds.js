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
// middleware.isLoggedIn,
router.post("/", (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    // let author = {
    //     id: req.user_id,
    //     username: req.body.username
    // };

    let newCampground = {name: name, price: price, image: image, description: description} //, author: author

    Campground.create(newCampground, (err, createdCampground) => {
        if(err) {
            console.log(err.message);
        } else {
            res.send(createdCampground)
        }
    });

});

// EDIT Route
// middleware.checkCampgroundOwnership,
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.send(foundCampground);
        }
    });
});

// UPDATE Route
// middleware.checkCampgroundOwnership,
router.put("/:id", (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// SHOW Route
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.send(campground);
        }
    });
});

// DESTROY Route
// middleware.checkCampgroundOwnership,
router.delete("/:id", (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;