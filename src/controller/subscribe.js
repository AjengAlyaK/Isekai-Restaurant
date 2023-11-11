const Subscribe = require('../model/subscribe');

const subscribe =  (req, res) => {
    const subscribeData = req.body;

    Subscribe.create(subscribeData) 
        .then((subscriber) => {
            res.status(201);
            res.redirect('/home')
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create subscriber' });
        });
}

module.exports = { subscribe };