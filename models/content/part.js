const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const partSchema = new Schema({

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

    madeIn: {
        type: String,
        required: true,
    },

    SpecificationAr: {
        type: String,
        required: true,
        maxlength: 110,
    },
    SpecificationEn: {
        type: String,
        required: true,
        maxlength: 110,
    },

    size: {
        type: String,
        required: true,
        maxlength: 75,
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
        default:'Active'
    },
    price: {
        type: Number,
        required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
    createDate: { type: Date },
    updateDate: {type:Date}
});


const part = mongoose.model('Parts', partSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        descriptionAr: Joi.string().required(),
        descriptionEn: Joi.string().required(),
        madeIn: Joi.string().required(),
        SpecificationAr: Joi.string().max(110).required(),
        SpecificationEn: Joi.string().max(110).required(),
        size: Joi.string().max(70).required(),
        price: Joi.Number().required(),
        category: Joi.ObjectId().required(),

    };

    return Joi.validate(data, Schema);
}


exports.part = part;
exports.validatePart = validateData;
