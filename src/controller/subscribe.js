const Subscribe = require('../model/subscribe');

const subscribe =  (req, res) => {
    const subscribeData = req.body;

    Subscribe.create(subscribeData) 
        .then((subscriber) => {
            console.log('Subscriber created:', subscriber);
            res.status(201).json(subscriber);
        })
        .catch((error) => {
            console.error('Error creating subscriber:', error);
            res.status(500).json({ error: 'Failed to create subscriber' });
        });
}

module.exports = { subscribe };