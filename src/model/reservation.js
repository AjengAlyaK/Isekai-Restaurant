const mongoose = require('mongoose');

// Membuat Schema User
const reservationUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    tablesAmount: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    dateReservation: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'In Process'
    },
});

// Add timestamps option to the schema
reservationUser.set('timestamps', true);

// Create the Note model
const Reservation = mongoose.model('reservation', reservationUser);


module.exports = Reservation;