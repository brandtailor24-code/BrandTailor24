require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import models
const User = require('./models/User');
const Service = require('./models/Service');
const Review = require('./models/Review');
const Inquiry = require('./models/Inquiry');
const Order = require('./models/Order');

// Import middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter for Authentication routes (prevent brute force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs for auth routes
    message: { message: 'Too many attempts from this IP. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Debugging
console.log("Attempting to connect to MongoDB...");
console.log("URI Length:", process.env.MONGODB_URI ? process.env.MONGODB_URI.length : "undefined");
// console.log("URI:", process.env.MONGODB_URI); // Uncomment to see full URI if needed

// MongoDB Connection with Local Offline Fallback
const connectWithFallback = (uri) => {
    mongoose.connect(uri)
        .then(() => console.log(`✅ MongoDB Connected Successfully (${uri.includes('mongodb+srv') ? 'Atlas Cloud' : 'Local Host'})`))
        .catch(err => {
            console.error('❌ MongoDB Connection Error:', err.message);
            const localURI = 'mongodb://127.0.0.1:27017/brandtailor';
            if (uri !== localURI) {
                console.log('🔄 Offline Mode: Attempting connection to local MongoDB fallback at 127.0.0.1:27017...');
                connectWithFallback(localURI);
            } else {
                console.error('❌ Critical: Local MongoDB connection also failed. Please ensure MongoDB service is running.');
            }
        });
};

connectWithFallback(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/brandtailor');

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

// --- ORDERS ---
app.post('/api/orders', async (req, res) => {
    try {
        const { name, phone, address, pickupDate, pickupTime, items } = req.body;

        // Generate unique order ID
        let orderId;
        let isUnique = false;
        while (!isUnique) {
            orderId = 'BT-' + Math.floor(100000 + Math.random() * 900000);
            const existingOrder = await Order.findOne({ orderId });
            if (!existingOrder) {
                isUnique = true;
            }
        }

        const newOrder = new Order({
            orderId,
            customerName: name,
            phone,
            address,
            pickupDate,
            pickupTime,
            items,
            fabricSelection: req.body.fabricSelection || 'pickup',
            paymentMode: req.body.paymentMode || 'Pay on Delivery',
            pickupDetails: req.body.pickupDetails || {
                address,
                scheduledTime: new Date(),
                status: 'Pending'
            },
            status: 'Received'
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Booking created successfully', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// Admin: Get all orders
app.get('/api/orders', [auth, admin], async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

// Admin: Update order status
app.patch('/api/orders/:id', [auth, admin], async (req, res) => {
    try {
        const { status, pickupDetails, measurements } = req.body;
        const updateFields = {};
        if (status) updateFields.status = status;
        if (pickupDetails) updateFields.pickupDetails = pickupDetails;
        if (measurements) updateFields.measurements = measurements;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// --- AUTHENTICATION ---
app.post('/api/auth/register', authLimiter, async (req, res) => {
    try {
        // Clean and Sanitize Inputs
        const name = req.body.name ? req.body.name.trim().replace(/[<>]/g, "") : ""; // Sanitize simple HTML/XSS
        const phone = req.body.phone ? req.body.phone.trim() : "";
        const password = req.body.password ? req.body.password : "";

        // Validation
        if (!name || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
        }

        // Strong Password Validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).' 
            });
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

app.post('/api/auth/login', authLimiter, async (req, res) => {
    try {
        // Clean and Sanitize Inputs
        const phone = req.body.phone ? req.body.phone.trim() : "";
        const password = req.body.password ? req.body.password : "";

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
            // Generic Error Message to prevent user enumeration
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        // Check if account is locked
        if (user.isLocked()) {
            const timeRemaining = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(423).json({ 
                message: `Account is temporarily locked due to too many failed attempts. Try again in ${timeRemaining} minute(s).` 
            });
        }

        // Check password using bcrypt comparison
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            // Increment failed login attempts
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
                await user.save();
                return res.status(423).json({ 
                    message: 'Account is temporarily locked due to too many failed attempts. Please try again in 15 minutes.' 
                });
            }
            await user.save();
            return res.status(401).json({ message: 'Invalid phone number or password' });
        }

        // Reset login attempts on successful login
        if (user.loginAttempts > 0 || user.lockUntil) {
            user.loginAttempts = 0;
            user.lockUntil = undefined;
            await user.save();
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
        delete userResponse.loginAttempts;
        delete userResponse.lockUntil;

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
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: { $in: ['Received', 'In Progress', 'Ready'] } });
        const totalUsers = await User.countDocuments({ role: 'user' });

        res.json({
            totalOrders,
            pendingOrders,
            totalRevenue: 0,
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

module.exports = app;
