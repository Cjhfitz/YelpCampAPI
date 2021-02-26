const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const campgroundController = require('../controllers/campground');

// INDEX Route
router.route('/')
    .get(campgroundController.index)

// CREATE Route
// middleware.isLoggedIn,
router.post("/", async (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    // let author = {
    //     id: req.user_id,
    //     username: req.body.username
    // };

    let newCampground = {name: name, price: price, image: image, description: description} //, author: author

    await Campground.create(newCampground, (err, createdCampground) => {
        if(err) {
            res.status(500);
            console.log(err.message);
        } else {
            res.status(200);
            res.send(createdCampground)
        }
    });

});

// EDIT Route
// middleware.checkCampgroundOwnership,
router.get("/:id/edit", async (req, res) => {
    await Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            res.status(500);
            console.log(err);
        } else {
            res.status(200);
            res.send(foundCampground);
        }
    });
});

// UPDATE Route
// middleware.checkCampgroundOwnership,
router.put("/:id", async(req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body, (err, updatedCampground) => {
        if(err) {
            res.status(500);
            console.log(err);
        } else {
            res.status(300);
            console.log(req.params.id);
            // res.redirect("/campgrounds/" + req.params.id);  // send user back to SHOW page
        }
    });
});

// SHOW Route
router.get("/:id", async (req, res) => {
    await Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if(err) {
            res.status(500);
            console.log(err);
        } else {
            res.status(200);
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