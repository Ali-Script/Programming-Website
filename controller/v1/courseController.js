const mongoose = require('mongoose');
const multer = require('multer');
const courseModel = require('./../../models/courseModel');
const sessionModel = require('./../../models/sessionModel');
const commentModel = require("./../../models/commentModel")
const categoryModel = require("./../../models/categoryModel");
const userModel = require('./../../models/userModel');
const usersCourses = require("./../../models/course-userModel");



exports.addCourse = async (req, res) => {
    try {

        const {
            title,
            description,
            price,
            href,
            cover,
            status,
            teacher,
            category,
            off,
            keywords,
        } = req.body


        const isvalidIDC = mongoose.Types.ObjectId.isValid(req.body.category)
        if (!isvalidIDC) {
            return res.status(402).json({ message: "Category ObjectId is not valid !!" })
        }
        const isvalidIDT = mongoose.Types.ObjectId.isValid(req.body.teacher)
        if (!isvalidIDT) {
            return res.status(402).json({ message: "Teacher ObjectId is not valid !!" })
        }

        const duplicate = await courseModel.findOne({ $or: [{ title }, { href }] })
        if (duplicate) {
            return res.status(422).json({ message: "Duplicated Data !!" })
        }



        const createCourse = await courseModel.create({
            title,
            description,
            price,
            href,
            cover: req.file.filename,
            status,
            teacher,
            category,
            off,
            keywords,
        })

        return res.json(createCourse)

    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.updateCourse = async (req, res) => {
    try {

        const isvalidIDC = mongoose.Types.ObjectId.isValid(req.body.category)
        if (!isvalidIDC) {
            return res.status(402).json({ message: "ObjectId is not valid !!" })
        }

        const {
            title,
            description,
            price,
            href,
            cover,
            status,
            teacher,
            category,
            off,
        } = req.body

        const createCourse = await courseModel.findOne({
            title,
            description,
            price,
            href,
            status,
            teacher,
            category,
            off,
        })

        if (createCourse) {
            return res.status(402).json({ message: "Equal content !!" })
        }

        const updateCourse = await courseModel.findByIdAndUpdate({ _id: req.params.id }, {
            title,
            description,
            price,
            href,
            cover: req.file.filename,
            status,
            teacher: req.user._id,
            category,
            off,
        })

        return res.json(updateCourse)

    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.deleteCourse = async (req, res) => {
    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isValid) {
            return res.status(402).json({ message: "Object ID is not valid" })
        }

        const deleteCourse = await courseModel.findByIdAndDelete({ _id: req.params.id })

        if (!deleteCourse) {
            return res.status(404).json({ message: "Course Not Found" })
        }

        return res.json({ message: "Course Deleted Successfully #" })

    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.getAllCourse = async (req, res) => {
    try {

        const { category } = req.params;
        let allCourses = []

        const isValid = mongoose.Types.ObjectId.isValid(req.params.category)
        if (!isValid) {
            return res.status(402).json({ message: "Object ID is not valid" })
        }

        const cat = await categoryModel.findOne({ _id: category })
        if (!cat) {
            return res.status(404).json({ message: "Category Not Found!" })
        }

        const course = await courseModel.find({ category: cat._id })
            .populate("teacher", "UserName")
            .populate("category", "href")
            .sort({ _id: -1 })
            .lean()

        if (course.length === 0) {
            return res.status(404).json({ message: "There is No Course With This CategoryID !" })
        }

        const comment = await commentModel.find({}).lean()
        const register = await usersCourses.find({}).lean()

        course.forEach((course) => {
            let score = null
            const reg = register.filter(item => item.Course.toString() === course._id.toString())

            const comments = comment.filter(item => {
                String(item.course) === String(course._id);
                return score += +item.score
            })

            allCourses.push({
                ...course,
                registers: reg.length ? reg.length : 0,
                AVGscore: Math.floor(score / comments.length)
            })

        })


        return res.json(allCourses)

    } catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.getOne = async (req, res) => {
    try {
        const { href } = req.params

        const course = await courseModel.findOne({ href }).lean()
            .populate("teacher", "UserName")
            .populate("category", "title ")

        if (!course) {
            return res.status(404).json({ message: "There is no Course With This Name !!" })
        }

        const comments = await commentModel.find({ course: course._id, isAccept: 1 })
            .populate("course", "title")
            .populate("creator", "UserName")
            .lean()

        const sessions = await sessionModel.find({ course: course._id })
            .populate("course", "title ")
            .lean()

        const usersRegisterd = await usersCourses.find({ Course: course._id })
            .populate("User", "UserName ")
            .select(" User Price")
            .lean()
        const countRegistered = usersRegisterd.length

        const isUserlogin = !!(await usersCourses.findOne({ User: req.user._id, Course: course._id }))

        let allComments = [];

        comments.forEach((mainComments) => {
            comments.forEach((answerComments) => {
                if (String(mainComments._id) == String(answerComments.mainCommentID)) {
                    allComments.push({
                        ...mainComments,
                        course: mainComments.course.title,
                        creator: mainComments.creator.name,
                        answerComments,
                    })

                }
            })
        })

        const noAnswerComments = await commentModel.find({ isAnswer: 0, haveAnswer: 0 })
            .populate("course", "title")
            .populate("creator", "UserName")
            .lean();
        noAnswerComments.forEach(i => allComments.push({ ...i }))

        return res.json({ course, comments: allComments, sessions, countRegistered: countRegistered, usersRegisterd, isUserlogin })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.relatedCourse = async (req, res) => {
    try {

        const { href } = req.params;

        const course = await courseModel.findOne({ href });
        if (!course) {
            return res.status(404).json({ message: "Course Not Found" })
        }

        let related = await courseModel.find({ category: course.category });
        related = related.filter(item => item.href !== href)

        return res.json(related)

    }
    catch (err) { return res.status(422).json({ message: err.message }) }
}
exports.popular = async (req, res) => {
    try {
        const courses = await courseModel.find({})

        if (courses.length === 0) return res.status(422).json({ message: "popular courses found: [0]" })

        let getpopular = []
        courses.forEach((item) => {

            if (item.score >= 4) {
                getpopular.push(item)
            }
        })
        return res.json(getpopular)
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.presell = async (req, res) => {
    try {
        const courses = await courseModel.find({ status: "presell" })

        if (courses.length == 0) {
            return res.status(404).json({ message: "There is no presell course !" })
        }

        return res.json(courses)

    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
exports.getAll = async (req, res) => {
    try {

        let allCourses = []

        const courses = await courseModel.find({})
            .populate("teacher", "UserName")
            .populate("category", "href")
            .sort({ _id: -1 })
            .lean()

        if (courses.length == 0) {
            return res.status(404).json({ message: "Empty !!" })
        }

        const comment = await commentModel.find({}).lean()
        const register = await usersCourses.find({}).lean()

        courses.forEach((course) => {
            let score = null
            const reg = register.filter(item => item.Course.toString() === course._id.toString())

            const comments = comment.filter(item => {
                String(item.course) === String(course._id);
                return score += +item.score
            })

            allCourses.push({
                ...course,
                registers: reg.length ? reg.length : 0,
                AVGscore: Math.floor(score / comments.length)
            })

        })


        return res.json(allCourses)
    }
    catch (err) {
        return res.status(422).json({ message: err.messages })
    }

}