require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const adminUser = {
    name: "Admin User",
    phone: "9999999999", // Special admin phone number
    password: "admin123", // Will be hashed by model
    role: "admin"
};

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');

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
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
