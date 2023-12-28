const mongoose = require('mongoose');
const sessionModel = require('./../../models/sessionModel');
const courseModel = require('./../../models/courseModel');


exports.addOne = async (req, res) => {
    try {

        const { title, video, time, free, course } = req.body;
        const { courseID } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(courseID)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const Fcourse = await courseModel.findOne({ _id: courseID })
        if (!Fcourse) return res.status(404).json({ message: "Course Not Found !!" })


        const sessoin = await sessionModel.create({
            title,
            video: req.file.filename,
            time,
            free,
            course: courseID,
        })

        return res.json(sessoin)
    }
    catch (err) {
        return res.status(422).json(err.message);
    }
}
// test 1 
exports.getOne = async (req, res) => {
    try {

        const { href, id } = req.params;

        const course = await courseModel.findOne({ href })
        const sessoin = await sessionModel.findOne({ _id: id });
        const sessoins = await sessionModel.find({ course: course._id });

        return res.json({ sessoin, other_sessions_for_this_course: sessoins });

    }
    catch (err) {
        return res.status(422).json(err.message);
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const session = await sessionModel.find({}).sort({ _id: -1 }).lean();
        if (session.length === 0) return res.status(422).json({ message: 'No session found !!' })
        return res.json(session);
    }
    catch (err) {
        return res.status(422).json(err.message);
    }
}
// test 1
exports.getAllFC = async (req, res) => {
    try {
        const { href } = req.params

        const course = await courseModel.findOne({ href }).lean()
        if (!course) return res.status(422).json({ message: 'No session found !!' })

        const session = await sessionModel.find({ courseID: course.id }).sort({ _id: -1 }).lean();
        if (session.length === 0) return res.status(422).json({ message: 'No session found !!' })

        return res.json(session);
    }
    catch (err) {
        return res.status(422).json(err.message);
    }
}
// test 1
exports.deleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const session = await sessionModel.findOneAndDelete({ _id: id });
        if (!session) return res.status(422).json({ message: "Session Not Found !!" })
        return res.json(session);
    }
    catch (err) {
        return res.status(422).json(err.message);
    }
}
// test 1