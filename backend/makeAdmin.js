require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const phone = process.argv[2];

if (!phone) {
    console.log('❌ Please provide a phone number: node makeAdmin.js <phone>');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        const user = await User.findOne({ phone });

        if (!user) {
            console.log(`❌ User with phone ${phone} not found`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();
        console.log(`✅ Successfully made user ${user.name} (${phone}) an ADMIN`);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });
