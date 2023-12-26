const mongoose = require('mongoose');
const commentModel = require("./../../models/commentModel")
const courseModel = require("./../../models/courseModel")
const validator = require("./../../validator/commentValidator")

exports.create = async (req, res) => {
    try {
        const { body, course, score } = req.body;

        const validationBody = validator(req.body);
        if (validationBody != true) {
            return res.status(422).json(validationBody)
        }

        const courseId = await courseModel.findOne({ _id: course })
        if (!courseId) {
            return res.status(404).json({ message: "Course Not Found", err: 404 })
        }

        const comment = await commentModel.create({
            body,
            creator: req.user._id,
            course: courseId._id,
            score,
            isAccept: 0,
            isAnswer: 0,
            haveAnswer: 0,

        })
        return res.json(comment)

    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const comment = await commentModel.findOneAndDelete({ _id: id })

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        if (comment.isAnswer === 1) {
            const commentt = await commentModel.findOneAndUpdate({ _id: comment.mainCommentID }, { haveAnswer: 0 })
        }

        if (comment.answer) {
            const deleteanswer = await commentModel.findOneAndDelete({ _id: comment.answer })
        }

        return res.json({ message: `Comment removed `, id: comment._id })
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.accept = async (req, res) => {
    try {

        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const comment = await commentModel.findOneAndUpdate({ _id: id }, { isAccept: 1 })

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        else if (comment.isAccept == 1) {
            return res.status(422).json({ message: 'Comment is Already Accepted ! ' })
        }

        return res.json({ message: 'Comment Accepted (:' })
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.reject = async (req, res) => {
    try {

        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const comment = await commentModel.findOneAndUpdate({ _id: id }, { isAccept: 0 })

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        else if (comment.isAccept == 0) {
            return res.status(422).json({ message: 'Comment is Already Rejected ! ' })
        }

        return res.json({ message: 'Comment Rejected (:' })
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.answer = async (req, res) => {
    try {
        const { body } = req.body;
        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const comment = await commentModel.findOneAndUpdate({ _id: id }, { isAccept: 1, haveAnswer: 1 })

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' })

        }

        const Canswer = await commentModel.create({
            body,
            creator: req.user._id,
            course: comment.course,
            isAccept: 1,
            isAnswer: 1,
            mainCommentID: comment._id
        })

        const setandser = await commentModel.findOneAndUpdate({ _id: id }, { $set: { answer: Canswer._id } })

        return res.json(Canswer)
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {

        const comments = await commentModel.find({})
            .populate("course", "title")
            .populate("creator", "UserName")
            .sort({ _id: -1 })
            .lean();

        let orderedComment = []

        comments.forEach(mainComment => {
            comments.forEach(answerComment => {

                if (String(mainComment._id) == String(answerComment.mainCommentID)) {

                    orderedComment.push({
                        ...mainComment,
                        course: answerComment.course.title,
                        creator: answerComment.creator.UserName,
                        answerComment
                    })
                }
            })
        })

        const noAnswerComments = await commentModel.find({ isAnswer: 0, haveAnswer: 0 })
            .populate("course", "title")
            .populate("creator", "UserName")
            .sort({ _id: -1 })
            .lean();
        noAnswerComments.forEach(i => orderedComment.push({ ...i }))

        return res.json(orderedComment)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
// test 1