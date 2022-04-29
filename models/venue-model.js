const mongoose = require('../db/connection')

const CommentSchema = new mongoose.Schema({
    title: String,
    content: String,
},
{timestamps: true})

const ArtistSchema = new mongoose.Schema({
    name: String,
    genres: [String]
})

const VenueSchema = new mongoose.Schema({
    name: {type: String, required: true},
    website: String,
    description: String,
    address: {
        poline: String,
        city: String,
        state: String,
        zip: Number
    },
    lat: String,
    long: String,
    comments: [CommentSchema],
    likes: Number,
    artists: [ArtistSchema]
})

const Venue = mongoose.model("Venue", VenueSchema)

module.exports = Venue