const express = require('express')
const venueRouter = express.Router()

const Venue = require('../models/venue-model')

venueRouter.get('/', (req, res) =>{
    Venue.find({})
    .then((venues) => res.render('index', {venues: venues}))
    .catch(console.error)
})

venueRouter.get('/newVenue', (req, res) => {
    res.render('new')
})

venueRouter.get('/:id', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => res.render('show', {venue: venue}))
    .catch(console.error)
})

venueRouter.get('/:id/edit', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => res.render('edit-venue', {venue:venue}))
    .catch(console.error)
})



venueRouter.get('/:venueId/:artistId', (req, res) => {
    Venue.findById(req.params.venueId)
    .then((venue) => {
        let artistFound = venue.artists.find((artist) => {
            return artist.id == req.params.artistId
        })
        res.render('showArtist', {artist: artistFound, venue: venue})
    })
    .catch(console.error)
})

venueRouter.get('/:venueId/:artistId/editArtist', (req,res) => {
    Venue.findById(req.params.venueId)
    .then((venue) => {
        // venue.artists.forEach((artist, index) => {
        //     if(artist.id === req.params.artistId){
        //         res.render('editArtist', {artist: artist, venue: venue})
        //     }
        // })
        let artistFound = venue.artists.find((artist) => {
            return artist.id === req.params.artistId
        })
        res.render('editArtist', {artist: artistFound, venue: venue})
    })
    .catch(console.error)
})



venueRouter.put('/:id', (req, res) => {
    Venue.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((venue) => {res.redirect(`/ANightOut/${req.params.id}`)})
    .catch(console.error)
})

venueRouter.post('/', (req, res) => {
    Venue.create(req.body)
    .then((venue) => {
        res.render('show', {venue: venue})
    })
    .catch(console.error)
})

venueRouter.post('/:id/newComment', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => {
        venue.comments.push(req.body)
        venue.save()
        res.render('show', {venue: venue})
    })
    .catch(console.error)
})

venueRouter.post('/:id/newArtist', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => {
        venue.artists.push(req.body)
        venue.save()
        res.render('show', {venue: venue})
    })
    .catch(console.error)
})

venueRouter.post('/:venueID/:artistID/addGenre', (req, res) =>{
    Venue.findById(req.params.venueID)
    .then((venue) => {
        venue.artists.forEach((artist) => {
            if(artist.id === req.params.artistID){
                let genre = req.body.genre
                artist.genres.push(genre)
                venue.save()
                res.render('editArtist', {artist: artist, venue: venue})
            }
        })
        
    })
})

venueRouter.delete('/:id/:commentid/deleteComment', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => {
        venue.comments.forEach((comment, index) => {
            if(comment.id === req.params.commentid){
                venue.comments.splice(index,1)
                venue.save()
            }
        })
        res.render('show', {venue: venue})
    })
    .catch(console.error)
})

venueRouter.delete('/:venueID/:artistID/:genreID/deleteGenre', (req,res) => {
    Venue.findById(req.params.venueID)
    .then((venue) => {
        venue.artists.forEach((artist) => {
            if(artist.id === req.params.artistID){
                // artist.genres.forEach((genre, index) => {
                //     if(genre === req.params.genreID){
                //         artist.genres.splice(index, 1)
                        
                //     }
                // })
                let delIndex = artist.genres.findIndex((genre) => genre ===req.params.genreID)
                artist.genres.splice(delIndex, 1)
                venue.save()
                res.redirect(`/ANightOut/${req.params.venueID}/${req.params.artistID}/editArtist`)
            }
        })
        // const foundArtist = venue.artists.find((artist) => artist.id === req.params.artistID)
        // let deleteIndex = foundArtist.genres.findIndex((genre) => genre === req.params.genreID)
        // foundArtist.genres.splice(deleteIndex, 1)
        
    })
    .catch(console.error)
})

venueRouter.delete('/:id/:artistID/deleteArtist', (req, res) => {
    Venue.findById(req.params.id)
    .then((venue) => {
        let delIndex = venue.artists.findIndex((artist) => artist.id === req.params.artistID)
        venue.artists.splice(delIndex, 1)
        venue.save()
        res.redirect(`/ANightOut/${req.params.id}`)
    })
    .catch(console.error)

})

venueRouter.delete('/:id', (req, res) => {
    Venue.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/ANightOut'))
    .catch(console.error)
})

module.exports = venueRouter