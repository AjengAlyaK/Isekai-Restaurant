const User = require('../model/user');
const Products = require('../model/product');

const allproducts = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        const products = await Products.find();
        res.render('product_2',{
            title: 'Kafe Saya | Products',
            layout: 'layouts/main-home',
            user,
            products
        });
    }
};

const allpromo = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        res.render('promo_2',{
            title: 'Kafe Saya | Promo',
            layout: 'layouts/main-home',
            user,
        });
    }
};

const mycart = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        res.render('mycart',{
            title: 'Kafe Saya | Cart',
            layout: 'layouts/main-home',
            user
        });
    }
};

module.exports = { allproducts, allpromo, mycart };