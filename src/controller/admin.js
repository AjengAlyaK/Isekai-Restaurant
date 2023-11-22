const CheckoutUser = require('../model/checkout');
const deleteCheckout = require('../model/checkout');
const UserReservation = require('../model/reservation');
const Product = require('../model/product');

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

const processReservation = async (req, res) => {
    const reservation = await UserReservation.find();
    res.render('process-reservation', {
        title: 'FlavourSpark',
        layout: 'layouts/admin-layout',
        reservation
    });
}

const deleteProcessR = (req, res) => {
    UserReservation.deleteOne({ _id: req.body.id }).then((result) => {
    // req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/process-reservation');
});
}

const updateStatusR =async(req, res) => {
    try {
        await Reservation.updateOne(
            { _id: req.body._id},
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then((result) =>{
            // kirimkan flash message
            // req.flash('msg', 'Data contact berhasil diubah!');
            res.redirect('/process-reservation');
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const updateStatusO = async (req, res) => {
    try {
        await Checkout.updateOne(
            { _id: req.body._id},
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then((result) =>{
            // kirimkan flash message
            // req.flash('msg', 'Data contact berhasil diubah!');
            res.redirect('/process-order');
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const admin = async (req, res) => {
    res.render('admin-index', {
        title: 'FlavourSpark',
        layout: 'layouts/admin-layout',
    });
} 

const deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.body.id }).then((result) => {
    // req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/admin-products');
});
}

const adminProducts =  async (req, res) => {
    const products = await Product.find();
    res.render('update-products', {
        title: 'FlavourSpark',
        layout: 'layouts/admin-layout',
        products
    });
}
module.exports = { processOrder, deleteProcessOrder, processReservation, deleteProcessR, updateStatusR, updateStatusO, admin, deleteProduct, adminProducts };