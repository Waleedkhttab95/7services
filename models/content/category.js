const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const categorySchema = new Schema({

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
        default:'Active'
    },
    price: {
        type: Number,
        required: true,
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Departments', required: true },
    updateDate:{type:Date},
    createDate: { type: Date }
});


const category = mongoose.model('Categories', categorySchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        price: Joi.number().required(),
        department: Joi.ObjectId().required(),

    };

    return Joi.validate(data, Schema);
}


exports.category = category;
exports.validateCategory = validateData;
