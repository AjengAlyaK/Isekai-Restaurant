const CheckoutUser = require('../model/checkout');
const deleteCheckout = require('../model/checkout');

const processOrder = async (req, res) => {
    try {
        const checkoutUser = await CheckoutUser.find();
        res.render('process-order',{
            title: 'FlavourSpark',
            layout: 'layouts/admin-layout',
            checkoutUser
        });
    } catch (error) {
        console.error('Error get data: ', error);
        res.status(500).json({ error: 'Failed get data'});
    }
}

const deleteProcessOrder = (req, res) => {
        deleteCheckout.deleteOne({ _id: req.body.id }).then((result) => {
        // req.flash('msg', 'Data contact berhasil dihapus!');
        res.redirect('/process-order');
    })
}

module.exports = { processOrder, deleteProcessOrder };