const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


/**
 * /
  @swagger
   components:
     schemas:
       Service:
         type: object
         required:
           - nameAr
           - nameEn
           - image
         properties:
           nameAr:
             type: String
             description: name of service in Arabic.
           nameEn:
             type: string
             description: name of service in English.
           image:
             type: file
             description: service image
         example:
            nameAr:وليد
            nameEn: waleed

 */



const ServiceSchema = new Schema({

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

    // image: {
    //     type: String,
    //     required: true,
    // },

    status: {
        type: String,
        required: true,
        maxlength: 10,
        enum: ['Active' , 'blocked'],
        default:"Active"
    },
    createDate: { type: Date },
    updateDate: { type: Date }
});


const service = mongoose.model('Services', ServiceSchema);

function validateData(data) {
    const Schema = {
        nameAr: Joi.string().max(60).required(),
        nameEn: Joi.string().max(60).required(),
    };

    return Joi.validate(data, Schema);
}





exports.service = service;
exports.validate = validateData;
