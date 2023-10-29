const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const User = require('./src/model/user');
require('./src/utils/db');
const cors = require('cors');
const app = express();
const port = 7000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.post('/signUp', (req, res) => {
    const userData = req.body;

    User.create(userData) // Use create() method for creating a single document
        .then((user) => {
            console.log('User created:', user);
            res.status(201).json(user); // Send a success response with the created user
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' }); // Send an error response
        });
});

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        title: 'Kafe Saya | Sign In',
        layout: 'layouts/entrance',
    });
});

// proses sign in
app.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
    // enhance later okay ;)
    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});


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

