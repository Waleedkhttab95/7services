const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const packageSchema = new Schema({

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

    type:{
        type:String,
        required:true
    },

    duration:{
        type:Number,
        required:true
    },
    basePrice: {
        type:Number,
        required:true
    },
    numberOfVisits: {type:Number, default:0},
    features: {
        type:String,
        required:true,
        maxlength: 150,

    },
    extraOption: [{
        category:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
        price:{type:Number},
        numberOfVisits: {type:Number, default:0}
    }],

    image: {
        type: String,
    },

    status: {
        type: String,
        required: true,
        enum: ['Active' , 'blocked'],
        default:"Active"
    },

    discount: {
        type: Number,
        required: true,
    },
    updateDate:{type:Date},
    createDate: { type: Date }
});


const package = mongoose.model('Packages', packageSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        descriptionAr: Joi.string().required(),
        descriptionEn: Joi.string().required(),
        type: Joi.string().required(),
        duration: Joi.number().required(),
        basePrice: Joi.number().required(),
        features: Joi.string().max(150).required(),
        extraOption: Joi.string().max(200).required(),
        discount: Joi.number().required(),

    };

    return Joi.validate(data, Schema);
}


exports.package = package;
exports.validatePackage = validateData;
