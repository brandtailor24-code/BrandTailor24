const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    message: String,
    image: String,
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Pickup Scheduled', 'Completed', 'Cancelled'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
