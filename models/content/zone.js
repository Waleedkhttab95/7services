const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const zoneSchema = new Schema({

    nameAr: {
        type: String,
        required: true,
        maxlength: 60,
    },

    nameEn: {
        type: String,
        required: true,
        maxlength: 60,
    },

    Neighborhood: {
        type: String,
        required: true,
    },
    location: {
        latitude:{type:String, required:true},
        longitude:{type:String, required:true}

    },
    status:{
        type:String,
        required:true,
        enum: ['Active' , 'blocked'],
        default:'Active'
    },
    updateDate:{type:Date},
    createDate: { type: Date }
});


const zone = mongoose.model('Zones', zoneSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        Neighborhood: Joi.string().required(),
        location: Joi.string().required(),

    };

    return Joi.validate(data, Schema);
}


exports.zone = zone;
exports.validateZone = validateData;
