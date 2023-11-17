const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const User = require('./src/model/user');
const Reservation = require('./src/model/reservation');
const Subscribe = require('./src/model/subscribe');
const Product = require('./src/model/product');
const Cart = require('./src/model/cart');
const Checkout = require('./src/model/checkout');
require('./src/utils/db');
const cors = require('cors');
// controller
const { signUp, signIn, profile, logout, home } = require('./src/controller/user');
const { root, product, promo, cart, signUpPage, signInPage } = require('./src/controller/index');
const { reservation } = require('./src/controller/reservation');
const { subscribe } = require('./src/controller/subscribe');
const { allproducts, allpromo, mycart } = require('./src/controller/home');
const { addToCart, checkout, deleteCart } = require('./src/controller/cart');
const { processOrder, deleteProcessOrder } = require('./src/controller/admin');
// make session
const session = require('express-session');
const MongoStore = require('connect-mongo');
// method override 
const methodOverride = require('method-override');

const app = express();
const port = 9000;

// setup method override
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

const sessionMiddleware = session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/food_order'
    }),
    cookie: { maxAge: 60 * 60 * 1000 }
});

app.use(sessionMiddleware);

app.get('/', root);
app.get('/product', product);
app.get('/promo', promo);
app.get('/cart', cart);
app.get('/signUp', signUpPage);
app.post('/signUp', signUp); // proses sign up
app.get('/signIn', signInPage);
app.post('/home', signIn); // proses sign in
app.get('/profile', profile);
// page after auth
app.get('/home', home);
app.get('/allproducts', allproducts);
app.get('/allpromo', allpromo);
app.get('/mycart', mycart);
app.post('/subscribe', subscribe);
app.post('/reservation', reservation);
app.post('/addtocart', addToCart);
app.delete('/delete-cart', deleteCart);
app.post('/checkout', checkout);
app.get('/logout', logout);

// admin
app.get('/admin', async (req, res) => {
    res.render('admin-index',{
        title: 'FlavourSpark',
        layout: 'layouts/admin-layout',
    });
});
app.get('/process-order', processOrder);
app.get('/process-reservation', async (req, res) => {
    res.render('process-reservation',{
        title: 'FlavourSpark',
        layout: 'layouts/admin-layout',
    });
});
app.delete('/delete-process-order', deleteProcessOrder);

app.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

