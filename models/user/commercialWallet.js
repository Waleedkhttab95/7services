
const mongoose = require('mongoose');

const { Schema } = mongoose;



const commercialWalletSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Commercial' },
    balance: {type:Number, default:0}

});




// create index
commercialWalletSchema.index({  user:1 });

const commercialWallet = mongoose.model('commercialWallets', commercialWalletSchema);




exports.commercialWallet = commercialWallet;
