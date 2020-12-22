const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    package:{ type: mongoose.Schema.Types.ObjectId, ref: 'Packages' },
    invoice:{ type: mongoose.Schema.Types.ObjectId, ref: 'invoices' },
    services:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
    location:{ type: mongoose.Schema.Types.ObjectId},
    isActive:{type:Boolean} ,
    totalAmount:{type:Number},
    isPaied:{type:Boolean,default:false},
    updateDate:{type:Date},
    createDate: { type: Date }
})


const subscription = mongoose.model('subscriptions', subscriptionSchema);



exports.subscription = subscription;