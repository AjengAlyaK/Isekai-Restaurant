const User = require('../model/user');
const Products = require('../model/product');
const Cart = require('../model/cart');

const allproducts = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        try {
            const user = await User.findOne({ _id: userId });
            const products = await Products.find();
            res.render('product_2',{
                title: 'FlavourSpark | Products',
                layout: 'layouts/main-home',
                user,
                products
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            // res.status(500).render('error', {
            // title: 'Kafe Saya | Error',
            // layout: 'layouts/main-home',
            // errorMessage: 'An error occurred while fetching data. Please try again later.'
            // });
        }
        
    }
};

const allpromo = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        res.render('promo_2',{
            title: 'FlavourSpark | Promo',
            layout: 'layouts/main-home',
            user,
        });
    }
};

const mycart = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        const mycart = await Cart.find({ buyer: user.username });
        // console.log(mycart);
        res.render('mycart',{
            title: 'FlavourSpark | Cart',
            layout: 'layouts/main-home',
            user,
            mycart
        });
    }
};

module.exports = { allproducts, allpromo, mycart };