const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    isPaid: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
