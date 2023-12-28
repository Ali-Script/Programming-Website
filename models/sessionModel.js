const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    free: {
        type: Number,
        enum: [0, 1],
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    }
}, { timestamps: true })

const sessionModel = mongoose.model('session', schema)
module.exports = sessionModel