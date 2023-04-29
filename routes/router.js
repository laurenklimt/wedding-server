const express = require('express')
const router = express.Router()
const Schemas = require('../models/schemas.js')

router.get('/parties/', async (req, res) => {
    const parties = Schemas.Parties

    const partyData = await parties.find().exec()
    if (partyData) {
        res.send(JSON.stringify(partyData))
    }
})

router.get('/parties/:id', async (req, res, next) => {
    const parties = Schemas.Parties
    const id = req.params.id
    const partyData = await parties.findOne({_id: id}).exec()
    if (partyData) {
        res.send(JSON.stringify(partyData))
    } else {
        next()
    }
})

router.put('/parties/:id', async (req, res) => {
    const id = req.params.id
    const parties = Schemas.Parties
    const newResponse = new Schemas.Parties({
        ...req.body,
        responded: true,
        updated: Date.now,
        guests: req.body.guests
    })
    const response = await parties.updateOne(
        { _id: id },
        newResponse,
    )
    if(response.acknowledged) {
        res.send("Your RSVP has been sent")
    }
})

router.get('/party/:email', async (req, res, next) => {
    const parties = Schemas.Parties
    const email = req.params.email
    const partyData = await parties.findOne({emails: email}).exec()
    if (partyData) {
        res.send(JSON.stringify(partyData))
    } else {
        next()
    }
})


module.exports = router