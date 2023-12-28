const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    message: {
        type: "string",
        required: true
    },
    adminID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    sendBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    seen: {
        type: Number,
        enum: [1, 0],
        default: 0
    },
}, { timestamps: true });

const notification = mongoose.model("notification", schema)

module.exports = notification;

