const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");
const campgroundController = require('../controllers/campground');


router.route('/')
    .get(campgroundController.index)
    .post(campgroundController.createCampground)

// SHOW, UPDATE, and DELETE (all use "/:id")
router.route("/:id")
    .get(campgroundController.getCampground)
    .put(campgroundController.updateCampground)
    .delete(campgroundController.deleteCampground);



// EDIT Route
// middleware.checkCampgroundOwnership,
router.route("/:id/edit")
    .get(campgroundController.getCampground);
;

module.exports = router;