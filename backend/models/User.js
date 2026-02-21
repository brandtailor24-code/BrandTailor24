const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    digitalTwin: {
        lastScanDate: Date,
        girths: Map, // Store calculated girths
        rawPoints: mongoose.Schema.Types.Mixed // Store raw MediaPipe data if needed
    }
});

// Hash password before saving
userSchema.pre('save', async function () {
    // Only hash if password is modified or new
    if (!this.isModified('password')) return;

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', userSchema);
