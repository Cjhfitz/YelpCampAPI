const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware/index");

// CREATE Route
router.post("/", (req, res) => {
    Campground.findById(req.params.id, middleware.isLoggedIn, (err, foundCampground) => {
        if(err) {
            console.log(err)
        } else {
            // passed in form as an obj named comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err)
                } else {
                    // comment.author.id = req.user._id;
                    // comment.author.username = req.user.username;
                    comment.save();
                    
                    foundCampground.comments.push(comment);
                    foundCampground.save();

                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

// UPDATE Route
router.put("/:comment_id/", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Route
router.delete("/:comment_id/", middleware.checkCommentOwnership, (req, res)=> {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;