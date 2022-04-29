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


app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get("port")} 🌟`);
})
