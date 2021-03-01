const Campground = require('../models/campground');


module.exports.index = async (req, res) => {
    try {
        throw new Error('oops');
        const campgrounds = await Campground.find({});
        res.send(campgrounds);
    } catch(e) {
        res.send(e.message)
    }
}

// For SHOW and EDIT routes
module.exports.getCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
}

module.exports.createCampground = async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
}

// module.exports.editCampground = async (req, res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.send(campground);
// }

module.exports.updateCampground = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, req.body);
}

module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
}