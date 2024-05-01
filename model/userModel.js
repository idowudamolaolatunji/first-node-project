const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: String,
    role: {
        type: String,
        enum: ['user', 'vendor'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;