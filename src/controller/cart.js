const Cart = require('../model/cart');

const addToCart =  (req, res) => {
    const element = req.body;

    Cart.create(element) 
        .then((e) => {
            console.log('Product added to cart:', e);
            res.status(201).json(e);
        })
        .catch((error) => {
            console.error('Error add to cart:', error);
            res.status(500).json({ error: 'Failed add to cart ' });
        });
};

module.exports = { addToCart };