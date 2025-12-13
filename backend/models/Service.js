const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: String,
    desc: String
});

module.exports = mongoose.model('Service', serviceSchema);
