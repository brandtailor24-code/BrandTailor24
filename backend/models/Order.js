const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: String,
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Received',
        enum: ['Received', 'In Progress', 'Ready', 'Completed', 'Cancelled']
    },
    category: String,
    serviceType: String,
    fabric: String,
    addons: [String],
    measurements: mongoose.Schema.Types.Mixed,
    pickupDate: String,
    pickupTime: String,
    address: String,
    paymentMode: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
