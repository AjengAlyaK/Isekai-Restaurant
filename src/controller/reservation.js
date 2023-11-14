const Reservation = require('../model/reservation');

const reservation = async (req, res) => {
    if (req.session.userId) {
        const reservationData = req.body;

        try {
            const reservation = await Reservation.create(reservationData);
            // console.log('Reservation created:', reservation);
            // res.status(201).json(responseData);
            res.redirect('/home');

        } catch (error) {
            console.error('Error creating reservation:', error);
            res.status(500).json({ error: 'Failed to create reservation' });
        }
    }
};
module.exports = { reservation };