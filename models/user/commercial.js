const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { Schema } = mongoose;



const commercialSchema = new Schema({

    companyName: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 15,
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        maxlength: 60,
        unique:true
    },

    phoneNumber: {
        type: Number,
        required: true,
        unique:true
    },

    CR: {
        type:Number,
        required:true
    },
    officeNumber:{
        type:Number,
        minlength:1,
        maxlength:6
    },
    location: [{
        latitude:{type:String, required:true},
        longitude:{type:String, required:true} ,
        isSubscripe:{type:Boolean,default:false},
        id:{type:mongoose.Schema.Types.ObjectId}
    }],
    AcceptTerms:{
        type:Boolean,
        required:true
    },
    otp:{
        type:Number,
    },
    isConfirmed: {
        type: Boolean,
        default:false
    },
    createDate: { type: Date }
});


// genrate token
commercialSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, keys.jwtKey);

    return token;
}

// create index
commercialSchema.index({  phoneNumber:1 });

const commercial = mongoose.model('Commercial', commercialSchema,'users');

function validateData(data) {
    const Schema = {
        companyName: Joi.string().min(3).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        phoneNumber: Joi.Number().required(),
        CR: Joi.Number().required(),
        officeNumber: Joi.Number().min(1).max(6).required(),
        AcceptTerms: Joi.Boolean().required(),

    };

    return Joi.validate(data, Schema);
}


exports.commercial = commercial;
exports.validateCommercial = validateData;
