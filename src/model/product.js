const mongoose = require('mongoose');

// Membuat Schema Product
const Product = mongoose.model('Product', {
    name_product: {
        type: String,
        required: true
    },
    pict_product: {
        type: String,
    },
    pict_thumb: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});


// const newProduct = new Product({
//     name_product: 'Strawberry Drink',
//     pict_product: 'strawberry-drink.jpg',
//     pict_thumb: 'strawberry-drink.jpg',
//     price: '15.000',
//     preview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
//     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cum nihil recusandae corporis excepturi consequuntur, ex quo est deleniti quam.',
//     category: 'Desert'
// });

// newProduct.save();

module.exports = Product;