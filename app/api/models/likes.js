const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define a schema
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    id: {
        type: Number,
        requried: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        require: true
    }
});

LikesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Likes', LikesSchema);


