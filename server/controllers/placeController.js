const Place = require("../models/Place");

const getPlaces = async(req, res) => {
    try {
        const places = await Place.find();

        res.status(200).json(places);
    }
    catch(error) {
        console.error("Error fetching places: ", error);

        res.status(500).json({
            message: "Failed to fetcch places"
        });
    }
};

const getPlaceBySlug = async(req, res) => {
    try {
        const place = await Place.findOne({
            slug: req.params.slug
        });

    if (!place) {
        return res.status(404).json({
            message: "Place not found"
        });
    }

    res.status(200).json(place);
    } catch (error) {
        console.error("Error fetching place: ", error);
        res.status(500).json({
            message: "Failed to fetch place"
        });
    }
};

module.exports = {
    getPlaces,
    getPlaceBySlug
};