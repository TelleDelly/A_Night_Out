const seed = require('./seed.json')
const Venue = require('../models/venue-model')

Venue.deleteMany({})
.then(() => {
    Venue.insertMany(seed)
    .then(console.log)
    .catch(console.error)
})