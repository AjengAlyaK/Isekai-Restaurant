const mongoose = require('mongoose');

// Membuat Schema User
const Subscribe = mongoose.model('Subscribe', {
    subscribtion: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = Subscribe;