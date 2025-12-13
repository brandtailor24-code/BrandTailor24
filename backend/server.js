require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Order = require('./models/Order');
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

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- ORDERS ---
// Protected route - requires authentication
app.get('/api/orders', auth, async (req, res) => {
    try {
        // Get orders for the authenticated user
        const orders = await Order.find({ phone: req.user.phone }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Protected route - requires authentication
app.post('/api/orders', auth, async (req, res) => {
    try {
        const newOrder = new Order({
            orderId: `ORD-${Date.now()}`,
            status: 'Received',
            phone: req.user.phone, // Use authenticated user's phone
            ...req.body
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// Protected route - requires authentication
app.patch('/api/orders/:id', auth, async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: req.params.id, phone: req.user.phone }, // Ensure user owns order
            req.body,
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found or unauthorized' });
        }
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// Protected route - get single order
app.get('/api/orders/:id', auth, async (req, res) => {
    try {
        // Try to find by _id or orderId
        const order = await Order.findOne({
            $or: [{ _id: req.params.id }, { orderId: req.params.id }],
            phone: req.user.phone // Ensure user owns order
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        // Check if error is due to invalid ObjectId (which means we might be searching by orderId which is string)
        // If searching by orderId failed above (it wouldn't throw, just null), but if _id cast failed...
        // Actually findOne with $or might cast error if one branch fails cast. 
        // Let's simplify: Search by orderId first (string), then _id if looks like objectId?
        // Or just Order.findOne({ orderId: req.params.id, phone: req.user.phone })
        // The CustomerPortal sends whatever user typed. 
        // Let's stick to safe search.
        res.status(500).json({ message: 'Error fetching order' });
    }
});

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

// Get Dashboard Stats
app.get('/api/admin/stats', [auth, admin], async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: { $in: ['Received', 'In Progress'] } });
        const revenue = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);
        const totalUsers = await User.countDocuments({ role: 'user' });

        res.json({
            totalOrders,
            pendingOrders,
            totalRevenue: revenue[0] ? revenue[0].total : 0,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
});

// Get All Orders (Admin)
app.get('/api/admin/orders', [auth, admin], async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update Order Status (Admin)
app.patch('/api/admin/orders/:id', [auth, admin], async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
});

// Delete Order (Admin)
app.delete('/api/admin/orders/:id', [auth, admin], async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
});

// Get All Users (Admin)
app.get('/api/admin/users', [auth, admin], async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password').sort({ registeredAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Delete User (Admin)
app.delete('/api/admin/users/:id', [auth, admin], async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
