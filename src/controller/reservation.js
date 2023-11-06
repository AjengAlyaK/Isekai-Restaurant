const Reservation = require('../model/reservation');

const reservation = (req, res) => {
    const reservationData = req.body;
    Reservation.create(reservationData) 
        .then((reservation) => {
            console.log('Reservation created:', reservation);
            res.status(201).json(reservation);
        })
        .catch((error) => {
            console.error('Error creating reservation:', error);
            res.status(500).json({ error: 'Failed to create reservation' });
        });
};
module.exports = { reservation };