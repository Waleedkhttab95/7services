const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const subCategorySchema = new Schema({

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
        maxlength: 10,
        enum: ['Active' , 'blocked'],
    },
    duration: {
        type: Number,
        required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
    createDate: { type: Date },
    updateDate: { type: Date }

});


const subCategory = mongoose.model('SubCategories', subCategorySchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        duration: Joi.Number().required(),
        category: Joi.ObjectId().required()
    };

    return Joi.validate(data, Schema);
}


exports.subCategory = subCategory;
exports.validateSubCategory = validateData;
