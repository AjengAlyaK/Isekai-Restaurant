const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const User = require('./src/model/user');
require('./src/utils/db');
const cors = require('cors');
// controller 
const { signUp, signIn } = require('./src/controller/user')
// make session
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const port = 7000;

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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Kafe Saya',
        layout: 'layouts/main-layout',
    });
});

app.get('/product', (req, res) => {
    res.render('product', {
        title: 'Kafe Saya | Produk',
        layout: 'layouts/main-layout',
    });
});

app.get('/promo', (req, res) => {
    res.render('promo', {
        title: 'Kafe Saya | Promo',
        layout: 'layouts/main-layout',
    });
});

app.get('/cart', (req, res) => {
    res.render('cart', {
        title: 'Kafe Saya | Keranjang Belanja',
        layout: 'layouts/main-layout',
    });
});

app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: 'Kafe Saya | Sign Up',
        layout: 'layouts/entrance',
    });
});

// proses sign up
app.post('/signUp', signUp);

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        title: 'Kafe Saya | Sign In',
        layout: 'layouts/entrance',
    });
});

// proses sign in
app.post('/signIn', signIn);


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

app.listen(port, "0.0.0.0", () => {
    console.log(`listening to port ${port}...`);
});

