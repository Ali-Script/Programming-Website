const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    User: {
        type: mongoose.Types.ObjectId,
        ref: "User",

    },
    Course: {
        type: mongoose.Types.ObjectId,
        ref: "course",

    },
    Price: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const model = mongoose.model("Users-Courses", schema);

module.exports = model;