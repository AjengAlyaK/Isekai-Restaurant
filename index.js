const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const User = require('./src/model/user');
require('./src/utils/db');
const cors = require('cors');
// controller 
const { signUp, signIn, profile, logout } = require('./src/controller/user');
const { root, product, promo, cart, signUpPage, signInPage } = require('./src/controller/index');
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
app.get('/home', async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        res.render('home',{
            title: 'Kafe Saya | Home',
            layout: 'layouts/main-home',
            user,
        });
    }
});
app.get('/logout', logout);

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

