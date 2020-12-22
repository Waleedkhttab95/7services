const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const promoCodeSchema = new Schema({

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


    status: {
        type: String,
        required: true,
        enum: ['Active' , 'blocked'],
        default:"Active"
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


const promoCode = mongoose.model('PromoCodes', promoCodeSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        discount: Joi.number().required(),

    };

    return Joi.validate(data, Schema);
}


exports.promoCode = promoCode;
exports.validatePromoCode = validateData;
