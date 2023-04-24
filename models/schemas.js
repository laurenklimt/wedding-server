const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = new Schema({
    name:{type:String, required:true},
    owner:{type:Number, required:true},
    emails:[String],
    responded: {type:Boolean},
    updated: {type:Date, default:Date.now},
    guests: [{
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        rsvp: {type:Boolean},
        diet: {type:Array}
    }]
})

const Parties = mongoose.model('parties', partySchema, 'parties');
const mySchemas = {'Parties':Parties};

module.exports = mySchemas