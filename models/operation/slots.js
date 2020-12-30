const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const slotSchema = new Schema({
    date:{ type: Date },
    hours:[{
        start : Number,
        end: Number,
        type: {type:String, enum:['PM', 'AM']}
    }],
    createDate: { type: Date }
});



const slot = mongoose.model('slots', slotSchema);



exports.slot = slot;

