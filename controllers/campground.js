const Campground = require('../models/campground');


module.exports.index = wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds); 
});

// returns a new function
// executes function passed and adds .catch() and handles error
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
};

// For SHOW and EDIT routes
module.exports.getCampground = wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
});

module.exports.createCampground = wrapAsync(async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
});

// module.exports.editCampground = async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.send(campground);
// }

module.exports.updateCampground = wrapAsync(async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body);
});

module.exports.deleteCampground = wrapAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
});