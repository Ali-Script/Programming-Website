const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    isAccept: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 5
    },
    isAnswer: {
        type: Number,
        required: true
    },
    haveAnswer: {
        type: Number,

    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: 'comment',
    },
    answer: {
        type: mongoose.Types.ObjectId,
        ref: 'comment',
        required: false
    }
}, { timestamps: true })

const commentModel = mongoose.model('comment ', schema)
module.exports = commentModel 