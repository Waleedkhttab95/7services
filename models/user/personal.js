const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { Schema } = mongoose;



const personalSchema = new Schema({
    type:{
        type:String,
        enum:['personal','commercial']
    },
    firstName: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 15,
    },
    lastName: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        maxlength: 60,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique:true
    },

    location: [{
        latitude:{type:String, required:true},
        longitude:{type:String, required:true},
        isSubscripe:{type:Boolean},
        id:{type:mongoose.Schema.Types.ObjectId}
    }],
    houseType:{
        type:String,
        required:true,
        enum: ['Apartment' , 'villa']
    },
    houseNumber:{
        type:Number,
        minlength:1,
        maxlength:6
    },
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
personalSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id,type:this.type}, keys.jwtKey);

    return token;
}

// create index
personalSchema.index({  phoneNumber:1 });

const personal = mongoose.model('Personal', personalSchema);

function validateData(data) {
    const Schema = {
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15).required(),
        password:Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        phoneNumber: Joi.number().required(),
        houseType: Joi.string().required(),
        houseNumber: Joi.number().required(),
        AcceptTerms: Joi.boolean().required(),
        latitude:Joi.string().required(),
        longitude:Joi.string().required(),

    };

    return Joi.validate(data, Schema);
}


exports.personal = personal;
exports.validatePersonal = validateData;
