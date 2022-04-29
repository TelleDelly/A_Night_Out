const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = 
process.env.NODE_ENV === 'production'
? process.env.DB_URL
: process.env.CONNECTION_STRING

mongoose.connect(mongoURI)
.then((instance) => {
    console.log('connected to db')  
})
.catch(error => console.error)

module.exports = mongoose