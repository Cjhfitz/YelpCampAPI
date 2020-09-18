const Campground = require("../models/campground");
const Comment = require("../models/comment");

// all middleware
let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                req.flash("error", "Campground not found");  // covers a data base error
                res.redirect("/campgrounds");
            } else {
                // is the user associated with the campground
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        // send user back to the page they were just on
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                req.flash("error", "Comment not found");
                res.redirect("/campgrounds");
            } else {
                // is the user associated with the comment
                // a way to access fields in the Comment
                if(foundComment.author.id.equals(req.user._id)) {  // req.user is provided by Passport, holds logged in user id
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        // send user back to the page they were just on
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login")
    }
}

module.exports = middlewareObj;

// another way to export middleware
// module.exports = {
//     // logic
// }