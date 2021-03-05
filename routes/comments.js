const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware/index");
const commentController = require("../controllers/comments");


router.route("/")
    .post(commentController.createComment)


module.exports = router;