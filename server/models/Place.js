const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Religious",
                "Historical",
                "Nature",
                "Wine & Leisure"
            ]
        },

        description: {
            type: String,
            required: true
        },

        shortDescription:{
            type: String,
            required: true
        },

        address: {
            type: String
        },

        location: {
            latitude: {
                type: Number,
                required: true
            },

            longitude: {
                type: Number,
                required: true
            }
        },

        distancesFromOrigins: {
            cbs: {
                distanceKm: Number,
                durationMinutes: Number
            },

            airport: {
                distanceKm: Number,
                durationMinutes: Number
            },
            
            railwayStation: {
                distanceKm: Number,
                durationMinutes: Number
            }
        },

        bestTimeToVisit: {
            type: String
        },

        bestTimeToVisitReason: {
            type: String
        },

        entryFee: {
            type: String
        },

        images: [
            {
                type: String
            }
        ],

        googlePlaceId: {
            type: String
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Place", placeSchema);