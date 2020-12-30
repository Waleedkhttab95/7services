const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;


const providerorderSchema = new Schema({
    provider:{ type: mongoose.Schema.Types.ObjectId, ref: 'Providers' },
    order:{ type: mongoose.Schema.Types.ObjectId, ref: 'orders'},
    createDate: { type: Date }
});



const providerOfOrder = mongoose.model('provideroforder', providerorderSchema);



exports.providerOfOrder = providerOfOrder;

