const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    walletBalance: {
        type: Number,
        default: 0
    }
});



walletSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: '_id fullName image',
    });

    next();
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;