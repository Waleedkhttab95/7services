const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    provider:{ type: mongoose.Schema.Types.ObjectId, ref: 'Providers' },
    invoice:{ type: mongoose.Schema.Types.ObjectId, ref: 'invoives' },
    services:{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' },
    subscription:[{ type: mongoose.Schema.Types.ObjectId, ref: 'subscriptions' }],

    location: {
        latitude:{type:String, required:true},
        longitude:{type:String, required:true}

    },
    orderStatus:{
        type:String,
        enum:['waiting','accepted','rejected','inProgress','closed','canceled']
    },
    RateOfService:{
        rateNumber:{
            type:Number,
            min:0,
            max:5
        },
        comment:{
            type:String
        }
    },
    timeOfOrder:{
        hour:{
            type:Number,
            max:24,
            min:1
        },
        minute:{
            type:Number,
            max:60,
            min:0
        },
        mid:{
            type:String,
            enum:['PM','AM']
        }
    },
    orderDate:{type:Date,min: setHoursZero()},
    updateDate:{type:Date},
    createDate: { type: Date }
})

const order = mongoose.model('orders', orderSchema);


function setHoursZero() {
    var today = Date.now();
    var Ld = new Date(today);
    Ld.setHours(0, 0, 0, 0);
    return Ld;
}

exports.order = order;
