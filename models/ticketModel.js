const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    departmentID: {
        type: mongoose.Types.ObjectId,
        ref: "department",
        required: true
    },
    departmentSubID: {
        type: mongoose.Types.ObjectId,
        ref: "departmentSub"
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    body: {
        type: "string",
        required: true
    },

    answer: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    isAnswer: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "ticket",
    },
    priority: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0
    },
}, { timestamps: true });

const ticket = mongoose.model("ticket", schema)

module.exports = ticket;

