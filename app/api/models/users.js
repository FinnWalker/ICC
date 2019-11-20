const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    postcode: {
        type: String,
        trim: true,
        required: true
    },
    marketing: {
        type: String,
        require: true
    },
    timestamp: {
        type: String
    },

    afghanistan: {
        type: String
    },
    australia: {
        type: String
    },
    bangladesh: {
        type: String
    },
    england: {
        type: String
    },
    india: {
        type: String
    },
    pakistan: {
        type: String
    },
    south_africa: {
        type: String
    },
    sri_lanka: {
        type: String
    },
    thailand: {
        type: String
    },
    west_indies: {
        type: String
    },
    other: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);