const express = require('express')
const methodOverride = require('method-override')
const venueController = require('./controllers/venue-controller')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/ANightOut', venueController)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('app is up and running on p'+ port)
})
