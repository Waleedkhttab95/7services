const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const offerSchema = new Schema({

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

    descriptionAr: {
        type: String,
        required: true,
    },

    descriptionEn: {
        type: String,
        required: true,
    },

    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true }],

    image: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ['Active' , 'blocked'],
        default:'Active'
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    updateDate:{type:Date},
    createDate: { type: Date }
});


const offer = mongoose.model('Offers', offerSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        descriptionAr: Joi.string().required(),
        descriptionEn: Joi.string().required(),
        startDate: Joi.Date().required(),
        endDate: Joi.Date().required(),
        discount: Joi.Number().required()

    };

    return Joi.validate(data, Schema);
}


exports.offer = offer;
exports.validateOffer = validateData;
