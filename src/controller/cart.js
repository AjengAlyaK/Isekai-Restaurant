const Cart = require('../model/cart');
const Checkout = require('../model/checkout');

const addToCart =  (req, res) => {
    if (req.session.userId) {
        const element = req.body;

        Cart.create(element) 
            .then((e) => {
                // console.log('Product added to cart:', e);
                // res.status(201).json(e);
                res.redirect('/allproducts');
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
    try {
        if(!req.session.userId){
            throw new Error('user not authenticated');
        }
        const { body } = req;
        const onCart = body;
        const buyer = body.username;

        const checkoutResult = await Checkout.insertMany(onCart);
        // console.log('Checkout success', checkoutResult);
        // res.status(201).json(checkoutResult);
        res.redirect('/mycart');

        await Cart.deleteMany({ buyer });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Checkout Failed'});
    }
}

const deleteCart = (req, res) => {
    Cart.deleteOne({ _id: req.body.id }).then((result) => {
        // req.flash('msg', 'Data contact berhasil dihapus!');
        res.redirect('/mycart');
    })
}

module.exports = { addToCart, checkout, deleteCart };