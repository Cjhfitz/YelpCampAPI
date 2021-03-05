const Comment = require("../models/comment");
const Campground = require("../models/campground");
const wrapAsync = require("../util/wrapAsync");


// CREATE Route
// middleware.isLoggedIn,
// { text: 'test comment 2' }
module.exports.createComment = wrapAsync( async (req, res) => {
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
    })
});

// Comment EDIT Route
// middleware.checkCommentOwnership,
module.exports.edit = wrapAsync(async (req, res) => {
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
// router.put("/:comment_id/", (req, res) => {
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
//         if(err) {
//             res.redirect("back")
//         } else {
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });

// DESTROY Route
// middleware.checkCommentOwnership,
// router.delete("/:comment_id/", (req, res)=> {
//     Comment.findByIdAndDelete(req.params.comment_id, (err) => {
//         if(err) {
//             res.redirect("back");
//         } else {
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });