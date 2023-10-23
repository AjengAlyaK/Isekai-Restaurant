const mongoose = require('mongoose');

// Membuat Schema User
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
});

module.exports = User;