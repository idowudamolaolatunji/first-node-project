const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: [true, 'Image must be provided']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;

