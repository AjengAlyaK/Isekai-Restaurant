const User = require('../model/user');

const signUp =  (req, res) => {
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
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.session.userId = user._id;
        console.log(req.session.userId);
        const s = req.session.userId;
        res.render('index', {
            title: 'Kafe Saya',
            layout: 'layouts/main-layout',
            s
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database error' });
    }
}
module.exports = { signUp, signIn };