const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware/index");

// CREATE Route
// middleware.isLoggedIn,
// { text: 'test comment 2' }
router.post("/", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // passed in form as an obj named comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
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

// Comment EDIT Route
// middleware.checkCommentOwnership,
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect("back");
        } else {
            
            res.send({comment: foundComment, campground_id: req.params.id});
        }
    });
});

// UPDATE Route
// middleware.checkCommentOwnership,
router.put("/:comment_id/", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Route
// middleware.checkCommentOwnership,
router.delete("/:comment_id/", (req, res)=> {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;