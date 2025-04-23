const mongoose = require('mongoose');
//this is schema

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    price : Number ,
    maxGuests: Number,
    // these are components of accomadation page
} , {timestamps: true});



// now the model
const PlaceModel = mongoose.model('Place',placeSchema);
module.exports = PlaceModel;

