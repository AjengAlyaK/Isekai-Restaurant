const Cart = require('../model/cart');
const Checkout = require('../model/checkout');

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

const checkout = (req, res) => {
    const onCart = req.body;

    Checkout.insertMany(onCart)
            .then((oc) => {
                console.log('Checkout success', oc);
                res.status(201).json(oc);
            })
            .catch((error) => {
                console.error('Checkout error:', error);
                res.status(500).json({ error: 'Checkout Failed ' });
            });
}

module.exports = { addToCart, checkout };