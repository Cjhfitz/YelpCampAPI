const Campground = require('../models/campground');


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
}

module.exports.createCampground = async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
}

module.exports.editCampground = async (req, res) => {
    res.send("Hello from campground controller edit route!!!")
}

module.exports.updateCampground = async (req, res) => {
    
}

module.exports.deleteCampground = async (req, res) => {
    
}