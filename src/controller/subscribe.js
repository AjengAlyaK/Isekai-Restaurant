const Subscribe = require('../model/subscribe');

const subscribe =  async (req, res) => {
    if (req.session.userId) {
        const subscribeData = req.body;

        try {
            const subscribe = await Subscribe.create(subscribeData);
            res.status(201);
            res.redirect('/home');
        } catch (error) {
            res.status(500).json({ error: 'Failed to create subscriber' });
        }
    }
}

module.exports = { subscribe };