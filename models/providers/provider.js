const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const providerSchema = new Schema({

    fullNameAr: {
        type: String,
        required: true,
        maxlength: 160,
    },

    fullNameEn: {
        type: String,
        required: true,
        maxlength: 160,
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    phoneNumber: {
        type: Number,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum:['Internal' , 'External']
    },
    nationality:{
        type:String,
        required:true
    },
    naId:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    neighborhood:{
        type:String,
        required:true
    },
    streetName:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
    },
    CR:{
        type:Number,
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['Active' , 'blocked']
    },
    services: {
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Services'   }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 2']}, // this only for external prov

    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zones', required: true },
    updateDate:{type:Date},
    createDate: { type: Date }
});

function arrayLimit(val) {
    return val.length <= 2;
  }

const provider = mongoose.model('Providers', providerSchema);

function validateData(data) {
    const Schema = {
        fullNameAr: Joi.string().max(160).required(),
        fullNameEn: Joi.string().max(160).required(),
        phoneNumber: Joi.Number().required(),
        email: Joi.string().required().email(),
        type: Joi.String().required(),
        nationality: Joi.String().required(),
        naId: Joi.Number().required(),
        city: Joi.String().required(),
        Neighborhood: Joi.String().required(),
        streetName: Joi.String().required(),
        status: Joi.String().required(),
        zone: Joi.String().required(),

    };

    return Joi.validate(data, Schema);
}


exports.provider = provider;
exports.validateProvider = validateData;
