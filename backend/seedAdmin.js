require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const adminUser = {
    name: "Admin User",
    phone: "9999999999", // Special admin phone number
    password: "admin123", // Will be hashed by model
    role: "admin"
};

const seedAdmin = async () => {
    // Check if admin exists
    const existingAdmin = await User.findOne({ phone: adminUser.phone });

    if (existingAdmin) {
        console.log('⚠️  Admin user already exists');
        // Update role just in case
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('🔄 Updated existing admin role');
    } else {
        // Create new admin
        const newAdmin = new User(adminUser);
        await newAdmin.save();
        console.log('✅ Created new admin user');
        console.log(`👤 Phone: ${adminUser.phone}`);
        console.log(`🔑 Password: ${adminUser.password}`);
    }

    process.exit(0);
};

const connectAndSeedAdmin = (uri) => {
    mongoose.connect(uri)
        .then(() => {
            console.log(`✅ MongoDB Connected (${uri.includes('mongodb+srv') ? 'Atlas Cloud' : 'Local Host'})`);
            seedAdmin().catch(e => {
                console.error('❌ Seeding Admin Error:', e);
                process.exit(1);
            });
        })
        .catch(err => {
            console.error('❌ Connection Error:', err.message);
            const localURI = 'mongodb://127.0.0.1:27017/brandtailor';
            if (uri !== localURI) {
                console.log('🔄 Offline Mode: Retrying seed admin on local MongoDB fallback...');
                connectAndSeedAdmin(localURI);
            } else {
                console.error('❌ Critical: Local seed admin failed.');
                process.exit(1);
            }
        });
};

connectAndSeedAdmin(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/brandtailor');
