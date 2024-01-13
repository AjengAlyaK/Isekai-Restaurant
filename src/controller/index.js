const User = require('../model/user');
const Product = require('../model/product');

require('../utils/db');

const root = (req, res) => {
    res.render('index', {
        title: 'FlavourSpark',
        layout: 'layouts/main-layout'
    });
}

const product = async (req, res) => {
    const products = await Product.find();
    res.render('product', {
        title: 'FlavourSpark | Products',
        layout: 'layouts/main-layout',
        products
    });
}

const promo = (req, res) => {
    res.render('promo', {
        title: 'FlavourSpark | Promo',
        layout: 'layouts/main-layout',
    });
}

const cart = async (req, res) => {
    res.render('cart', {
        title: 'FlavourSpark | Cart',
        layout: 'layouts/main-layout'
    });
}

const signUpPage = (req, res) => {
    res.render('signUp', {
        title: 'FlavourSpark | Sign Up',
        layout: 'layouts/entrance',
    });
}

const signInPage = (req, res) => {
    res.render('signIn', {
        title: 'FlavourSpark | Sign In',
        layout: 'layouts/entrance',
    });
}

module.exports = { root, product, promo, cart, signUpPage, signInPage };