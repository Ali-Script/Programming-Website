const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["running", 'compelect', "presell"],
        required: true
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Categories"
    },
    off: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        default: 5
    },
    keywords: {
        type: String,
    }

}, { timestamps: true })

schema.virtual("Sessions", {
    ref: "session",
    localField: "_id",
    foreignField: "course"
})


const courseModel = mongoose.model('course', schema)
module.exports = courseModel