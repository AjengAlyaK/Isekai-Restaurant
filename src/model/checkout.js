const mongoose = require('mongoose');

// Define the schema
const checkoutUser = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    products: [
        {
            product_name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        default: 'In Process',
    },
    payment: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
});

// Add timestamps option to the schema
checkoutUser.set('timestamps', true);

// Create the Note model
const Checkout = mongoose.model('checkoutUser', checkoutUser);

// Export the model
module.exports = Checkout;