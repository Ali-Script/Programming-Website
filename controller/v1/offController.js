const mongoose = require('mongoose');
const offModel = require('./../../models/offModel')
const courseModel = require('./../../models/courseModel')


exports.create = async (req, res) => {
    try {
        const { code, percent, course, count } = req.body;

        const isvalidID = mongoose.Types.ObjectId.isValid(course)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const Fcourse = await courseModel.findOne({ _id: course })
        if (!Fcourse) return res.status(404).json({ message: "Course Not Found !!" })

        const set = await offModel.create({
            code,
            percent,
            creator: req.user._id,
            course,
            count,
        })
        return res.json(set)
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const getOffs = await offModel.find({})
            .populate("course", "title")
            .populate("creator", "UserName")
            .sort({ _id: -1 })
            .lean()
        return res.json(getOffs)
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}
// test 1
exports.setToAll = async (req, res) => {
    try {
        const { off } = req.body;

        if (!req.body.off) return res.status(422).json({ error: "did you mean off ?" })

        const course = await courseModel.updateMany({ off })
        return res.json({ message: `${off} percent off set to all courses` })
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}
// test 1
exports.use = async (req, res) => {
    try {
        const { code } = req.params;
        const { course } = req.body;

        const isvalidID = mongoose.Types.ObjectId.isValid(course)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const Fcourse = await courseModel.findOne({ _id: course }).lean()
        if (!Fcourse) return res.status(422).json({ message: `${code} code is not a valid for this course !!` })

        const usesCount = await offModel.findOne({ code, course })

        if (usesCount.count <= usesCount.uses) {
            return res.status(403).send(`This offer has been used ${usesCount.count}/${usesCount.uses}`);
        }

        const use = await offModel.findOneAndUpdate({ code }, { uses: usesCount.uses + 1 })
        return res.json(use)
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}
// test 1
exports.remove = async (req, res) => {
    try {
        const { code } = req.params;
        const rmCode = await offModel.findOneAndRemove({ code }).lean()
        if (!rmCode) return res.status(422).json({ message: `${code} code not found !!` })
        return res.json(rmCode)
    }
    catch (err) {
        return res.status(422).json({ error: err.message });
    }
}
// test 1
