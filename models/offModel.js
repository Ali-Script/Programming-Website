const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    code: {
        type: "string",
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "course",
    },
    count: {
        type: Number,
        required: true
    },
    uses: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

const off = mongoose.model("off", schema)

module.exports = off;