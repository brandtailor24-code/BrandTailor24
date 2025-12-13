const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDb = () => {
    if (!fs.existsSync(DB_FILE)) {
        return { orders: [], services: [], reviews: [], gallery: [], inquiries: [], users: [] };
    }
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- ORDERS ---
app.get('/api/orders', (req, res) => {
    const db = readDb();
    const { phone } = req.query;
    if (phone) {
        const filtered = db.orders.filter(o => o.phone === phone);
        return res.json(filtered);
    }
    res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
    const db = readDb();
    const newOrder = {
        id: `ORD-${Date.now()}`,
        status: 'Received',
        createdAt: new Date().toISOString(),
        ...req.body
    };
    db.orders.push(newOrder);
    writeDb(db);
    res.status(201).json(newOrder);
});

app.patch('/api/orders/:id', (req, res) => {
    const db = readDb();
    const index = db.orders.findIndex(o => o.id === req.params.id);
    if (index !== -1) {
        db.orders[index] = { ...db.orders[index], ...req.body };
        writeDb(db);
        res.json(db.orders[index]);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// --- SERVICES ---
app.get('/api/services', (req, res) => {
    const db = readDb();
    res.json(db.services);
});

// --- REVIEWS ---
app.get('/api/reviews', (req, res) => {
    const db = readDb();
    res.json(db.reviews);
});

app.post('/api/reviews', (req, res) => {
    const db = readDb();
    const newReview = { id: Date.now(), ...req.body, date: "Just now" };
    db.reviews.push(newReview);
    writeDb(db);
    res.status(201).json(newReview);
});

// --- GALLERY ---
app.get('/api/gallery', (req, res) => {
    const db = readDb();
    res.json(db.gallery);
});

// --- INQUIRIES ---
app.post('/api/contact', (req, res) => {
    const db = readDb();
    const newInquiry = { id: Date.now(), ...req.body, receivedAt: new Date().toISOString() };
    db.inquiries.push(newInquiry);
    writeDb(db);
    res.status(201).json({ message: "Inquiry received" });
});

// --- AUTHENTICATION ---
app.post('/api/auth/register', (req, res) => {
    const db = readDb();
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
    const existingUser = db.users.find(u => u.phone === phone);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create new user
    const newUser = {
        id: `USER-${Date.now()}`,
        name,
        phone,
        password, // In production, this should be hashed
        registeredAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDb(db);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
        message: 'Registration successful',
        user: userWithoutPassword
    });
});

app.post('/api/auth/login', (req, res) => {
    const db = readDb();
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Find user
    const user = db.users.find(u => u.phone === phone);
    if (!user) {
        return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Check password
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
