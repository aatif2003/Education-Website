const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Payment = require('./models/paymentModel');
const authRoutes = require('./routes/loginroutes');


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/payments';

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// API to check if payment is paid or not
app.post('/api/payment', async (req, res) => {
    try {
        const { userId, courseId, isPaid } = req.body;

        const payment = new Payment({ userId, courseId, isPaid });
        await payment.save();

        res.status(201).json({ message: 'Payment status saved', payment });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save payment status', details: err });
    }
});

// API to fetch payment status
app.get('/api/payment/:userId/:courseId', async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const payment = await Payment.findOne({ userId, courseId });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ isPaid: payment.isPaid });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch payment status', details: err });
    }
});
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
