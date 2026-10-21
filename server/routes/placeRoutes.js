const express = require("express");

const {
    getPlaces,
    getPlaceBySlug
} = require("../controllers/placeController");

const router = express.Router();

router.get("/", getPlaces);
router.get("/:slug", getPlaceBySlug);

module.exports = router;