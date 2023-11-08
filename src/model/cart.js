const mongoose = require('mongoose');

// Membuat Schema Cart
const Cart = mongoose.model('Cart', {
    buyer: {
        type: String,
        required: true
    },
    name_product: {
        type: String,
        required: true
    },
    pict_product: {
        type: String,
        required: true
    },
    pict_thumb: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = Cart;