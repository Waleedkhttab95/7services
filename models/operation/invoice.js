const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const invoiceSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    order:{ type: mongoose.Schema.Types.ObjectId, ref: 'orders'},
    totalAmount:{type:Number,min:0},
    isPaid:{type:Boolean},
    updateDate:{type:Date},
    createDate: { type: Date }
});



const invoice = mongoose.model('invoices', invoiceSchema);



exports.invoice = invoice;

