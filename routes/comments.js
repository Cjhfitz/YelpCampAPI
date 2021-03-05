const express = require("express");
const router = express.Router({mergeParams: true});
const commentController = require("../controllers/comments");


router.route("/")
    .post(commentController.createComment);

router.route("/:comment_id/")
    .get(commentController.getComment)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);


module.exports = router;