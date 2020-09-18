const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const campground = require("../models/campground");
const e = require("express");

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
            res.send(createdCampground)
        }
    });

});
// // UPDATE Route
router.put("/:id", (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// // SHOW Route
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.send(campground);
        }
    });
});

// // DESTROY Route
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