const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const campgroundController = require('../controllers/campground');


router.route('/')
    .get(campgroundController.index)
    .post(campgroundController.createCampground)

// SHOW Route
// UPDATE will also go here since they use /:id
router.route("/:id").get(campgroundController.showCampground);



// EDIT Route
// middleware.checkCampgroundOwnership,
router.route("/:id/edit")
    .get(campgroundController.editCampground);

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






// router.get("/:id", async (req, res) => {
//     await Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
//         if(err) {
//             res.status(500);
//             console.log(err);
//         } else {
//             res.status(200);
//             res.send(campground);
//         }
//     });
// });

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