const seed = require('./seed.json')
const Venue = require('../models/venue-model')

Venue.deleteMany({})
.then(() => {
    return Venue.insertMany(seed)
})
.then(console.log)
.catch(console.error)
.finally(() => process.exit())