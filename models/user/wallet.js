const mongoose = require('mongoose');

const { Schema } = mongoose;



const walletSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Personal' },
    balance: {type:Number, default:0}

});




// create index
walletSchema.index({  user:1 });

const wallet = mongoose.model('Wallets', walletSchema);




exports.wallet = wallet;
