const User = require('../model/user');
const Product = require('../model/product');

require('../utils/db');

const root = (req, res) => {
    res.render('index', {
        title: 'Kafe Saya',
        layout: 'layouts/main-layout'
    });
}

const product = async (req, res) => {
    const products = await Product.find();
    res.render('product', {
        title: 'Kafe Saya | Produk',
        layout: 'layouts/main-layout',
        products
    });
}

const promo = (req, res) => {
    res.render('promo', {
        title: 'Kafe Saya | Promo',
        layout: 'layouts/main-layout',
    });
}

const cart = async (req, res) => {
    res.render('cart', {
        title: 'Kafe Saya | Keranjang Belanja',
        layout: 'layouts/main-layout'
    });
}

const signUpPage = (req, res) => {
    res.render('signUp', {
        title: 'Kafe Saya | Sign Up',
        layout: 'layouts/entrance',
    });
}

const signInPage = (req, res) => {
    res.render('signIn', {
        title: 'Kafe Saya | Sign In',
        layout: 'layouts/entrance',
    });
}

module.exports = { root, product, promo, cart, signUpPage, signInPage };