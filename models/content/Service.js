const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;




const ServiceSchema = new Schema({

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

    image: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        maxlength: 10,
        enum: ['Active' , 'blocked'],
        default:"Active"
    },
    createDate: { type: Date },
    updateDate: { type: Date }
});


const service = mongoose.model('Services', ServiceSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
    };

    return Joi.validate(data, Schema);
}





exports.service = service;
exports.validate = validateData;
