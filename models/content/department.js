const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const departmentSchema = new Schema({

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
        default:'Active'
    },
    type: {
        type: String,
        required: true,
        maxlength: 20,
        enum: ['Personal' , 'Commercial' , 'All']
    },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true },
    createDate: { type: Date },
    updateDate: { type: Date }
});


const department = mongoose.model('Departments', departmentSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
        type:Joi.string().max(20).required(),
        service: Joi.ObjectId().required()
    };

    return Joi.validate(data, Schema);
}





exports.department = department;
exports.validateDepartment = validateData;
