const mongoose = require('mongoose');

// Membuat Schema User
const Reservation = mongoose.model('Reservation', {
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
    }
});

module.exports = Reservation;