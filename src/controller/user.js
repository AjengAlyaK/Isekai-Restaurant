const User = require('../model/user');
const Checkout = require('../model/checkout');

const home = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        res.render('home',{
            title: 'Kafe Saya | Home',
            layout: 'layouts/main-home',
            user,
        });
    }
}

const signUp =  (req, res) => {
    const userData = req.body;

    User.create(userData) 
        .then((user) => {
            console.log('User created:', user);
            res.status(201).json(user);
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.session.userId = user._id;
        res.redirect('/home');
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
}

const profile = async (req, res) => {
    if (req.session.userId) {
        const userId = req.session.userId;
        const user = await User.findOne({ _id: userId });
        const buyer = user.username;
        const checkout = await Checkout.findOne({ username: buyer });
        console.log(checkout);
        // res.send(user.username);
        res.render('profile',{
            title: 'Kafe Saya | Profile',
            layout: 'layouts/main-home',
            user,
            checkout
        });
    } else {
        // here better add error 
        // res.status(500).send({ error: error.message });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/');
        }
    });
};

module.exports = { signUp, signIn, profile, logout, home };