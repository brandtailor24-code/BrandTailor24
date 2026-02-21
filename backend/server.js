require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Service = require('./models/Service');
const Review = require('./models/Review');
const Inquiry = require('./models/Inquiry');

// Import middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging
console.log("Attempting to connect to MongoDB...");
console.log("URI Length:", process.env.MONGODB_URI ? process.env.MONGODB_URI.length : "undefined");
// console.log("URI:", process.env.MONGODB_URI); // Uncomment to see full URI if needed

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- SERVICES ---
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
});

// --- REVIEWS ---
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error.message });
    }
});

// --- INQUIRIES ---
app.post('/api/contact', async (req, res) => {
    try {
        const newInquiry = new Inquiry(req.body);
        const savedInquiry = await newInquiry.save();
        res.status(201).json({ message: "Inquiry received", inquiry: savedInquiry });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting inquiry', error: error.message });
    }
});

// Admin: Get All Inquiries
app.get('/api/admin/inquiries', [auth, admin], async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inquiries', error: error.message });
    }
});

// Admin: Update Inquiry Status
app.patch('/api/admin/inquiries/:id', [auth, admin], async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating inquiry', error: error.message });
    }
});

// --- AUTHENTICATION ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Validation
        if (!name || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        // Create new user (password will be hashed by pre-save middleware)
        const newUser = new User({ name, phone, password });
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedUser._id, phone: savedUser.phone, name: savedUser.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user without password
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Validation
        if (!phone || !password) {
            return res.status(400).json({ message: 'Phone and password are required' });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number format' });
        }

        // Find user
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        // Check password using bcrypt comparison
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, phone: user.phone, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// --- ADMIN ROUTES ---

// Admin: Get All Users
app.get('/api/admin/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ registeredAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Admin: Update User Role
app.patch('/api/admin/users/:id/role', [auth, admin], async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error: error.message });
    }
});

// Admin: Delete User
app.delete('/api/admin/users/:id', [auth, admin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Get Dashboard Stats
app.get('/api/admin/stats', [auth, admin], async (req, res) => {
    try {
        const totalInquiries = await Inquiry.countDocuments();
        const pendingInquiries = await Inquiry.countDocuments({ status: 'New' });
        // const revenue = await Order.aggregate([
        //     { $match: { status: { $ne: 'Cancelled' } } },
        //     { $group: { _id: null, total: { $sum: "$price" } } }
        // ]);
        const totalUsers = await User.countDocuments({ role: 'user' });

        res.json({
            totalOrders: totalInquiries, // Reusing field name for compatibility if frontend expects it, or update frontend to read totalInquiries
            pendingOrders: pendingInquiries,
            totalRevenue: 0, // Revenue calculation removed as we are pivotting to inquiry model
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
