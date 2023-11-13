const Cart = require('../model/cart');
const Checkout = require('../model/checkout');

const addToCart =  (req, res) => {
    if (req.session.userId) {
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
    } else {
        res.status(500).send({ error: error.message });
    }
};

const checkout = async (req, res) => {
    // if (req.session.userId) {
    //     const onCart = req.body;
    //     const buyer = req.body.username;

    //     Checkout.insertMany(onCart)
    //             .then((oc) => {
    //                 console.log('Checkout success', oc);
    //                 res.status(201).json(oc);
    //             })
    //             .catch((error) => {
    //                 console.error('Checkout error:', error);
    //                 res.status(500).json({ error: 'Checkout Failed ' });
    //             });
    //     const buy = await Cart.deleteMany({ buyer: buyer });
    // } else {
    //     res.status(500).send({ error: error.message });
    // }
    try {
        if(!req.session.userId){
            throw new Error('user not authenticated');
        }
        const { body } = req;
        const onCart = body;
        const buyer = body.username;

        const checkoutResult = await Checkout.insertMany(onCart);
        console.log('Checkout success', checkoutResult);
        res.status(201).json(checkoutResult);

        await Cart.deleteMany({ buyer });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Checkout Failed'});
    }
}

module.exports = { addToCart, checkout };