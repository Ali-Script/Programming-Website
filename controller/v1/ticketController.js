const mongoose = require('mongoose');
const ticketModel = require('./../../models/ticketModel')
const departmentModel = require('./../../models/departmentModel')
const departmentSubModel = require('./../../models/department-subModel')
const courseModel = require('./../../models/courseModel')


exports.create = async (req, res) => {
    try {

        const { departmentID, departmentSubID, course, body, priority } = req.body;


        const isvalidID = mongoose.Types.ObjectId.isValid(departmentID)
        if (!isvalidID) return res.status(422).json({ message: "Invalid departmentID ObjectId !!" })

        const getdepartment = await departmentModel.findOne({ _id: departmentID }).lean()
        if (!getdepartment) return res.status(404).json({ message: "no department find !!" })



        const isvalidIDsub = mongoose.Types.ObjectId.isValid(departmentSubID)
        if (!isvalidIDsub) return res.status(422).json({ message: "Invalid departmentSubID ObjectId !!" })

        const getdepartmentsub = await departmentSubModel.findOne({ _id: departmentSubID }).lean()
        if (!getdepartmentsub) return res.status(404).json({ message: "no department-sub find !!" })



        const isvalidIDcourse = mongoose.Types.ObjectId.isValid(course)
        if (!isvalidIDcourse) return res.status(422).json({ message: "Invalid course ObjectId !!" })

        const findcourse = await courseModel.findOne({ _id: course }).lean()
        if (!findcourse) return res.status(404).json({ message: "no course find !!" })


        const newTicket = await ticketModel.create({
            departmentID,
            departmentSubID,
            userID: req.user._id,
            course,
            body,
            priority
        })

        const get = await ticketModel.findOne({ _id: newTicket })
            .populate("userID", "UserName")
            .populate("departmentID", "title")
            .populate("departmentSubID", "title")
            .populate("course", "title")

        return res.json(get)
    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
exports.getAll = async (req, res) => {
    try {

        const getall = await ticketModel.find()
            .populate("departmentID", "title")
            .populate("departmentSubID", "title")
            .populate("userID", "UserName")
            .populate("course", "title")
            .sort({ _id: -1 })
            .lean();

        if (getall.length === 0) return res.status(404).json({ message: "no ticket found !!" })

        let orderedComment = []

        getall.forEach(mainComment => {
            getall.forEach(answerComment => {

                if (String(mainComment._id) == String(answerComment.parent)) {

                    orderedComment.push({
                        ...mainComment,
                        course: answerComment.course.title,
                        userID: answerComment.userID.UserName,
                        departmentID: answerComment.departmentID.title,
                        departmentSubID: answerComment.departmentSubID.title,
                        answerComment
                    })
                }
            })
        })

        const noAnswers = await ticketModel.find({ isAnswer: 0, answer: 0 }).sort({ _id: -1 })
            .populate("departmentID", "title")
            .populate("departmentSubID", "title")
            .populate("userID", "UserName")
            .populate("course", "title")
            .sort({ _id: -1 })
            .lean();

        noAnswers.forEach(i => orderedComment.push({ ...i }))

        return res.json(orderedComment)
    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
exports.myTicket = async (req, res) => {
    try {
        const getme = await ticketModel.find({ userID: req.user._id })
            .sort({ _id: -1 })
            .populate("userID", "UserName")
            .populate("departmentID", "title")
            .populate("departmentSubID", "title")
            .populate("course", "title")

        if (getme.length === 0) return res.status(404).json({ message: "no ticket found !!" })

        const filterTickets = getme.filter(e => e.isAnswer === 0)

        return res.json(filterTickets)
    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
// exports.department = async (req, res) => {
//     try {
//         const getall = await departmentModel.find();
//         return res.json(getall)
//     } catch (err) { return res.status(422).json(err.message); }
// }
// exports.departmentSub = async (req, res) => {
//     try {
//         const getall = await departmentSubModel.find({ parent: req.params.id });
//         return res.json(getall)
//     } catch (err) { return res.status(422).json(err.message); }
// }
exports.answer = async (req, res) => {
    try {
        const { body, ticketID } = req.body;

        const isvalidID = mongoose.Types.ObjectId.isValid(ticketID)
        if (!isvalidID) return res.status(422).json({ message: "Invalid ticketID ObjectId !!" })

        const answer = await ticketModel.findOne({ _id: ticketID });
        if (!answer) return res.status(404).json({ message: "no ticket found !!" })

        const sendAnswer = await ticketModel.create({
            departmentID: answer.departmentID,
            departmentSubID: answer.departmentSubID,
            parent: ticketID,
            userID: req.user._id,
            course: answer.course,
            body,
            priority: answer.priority,
            isAnswer: 1,
        })
        const Updateanswer = await ticketModel.findOneAndUpdate({ _id: answer }, { answer: 1 });
        return res.json(sendAnswer);
    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
exports.getAnswer = async (req, res) => {
    try {
        const { id } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(id)
        if (!isvalidID) return res.status(422).json({ message: "Invalid ObjectId !!" })

        const mainTicket = await ticketModel.findOne({ _id: id });
        const answerTicket = await ticketModel.findOne({ parent: id });

        return res.json({
            mainTicket: mainTicket,
            answerTicket: answerTicket ? answerTicket : "No response has been registered yet"
        })
    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
exports.remove = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const findmenu = await ticketModel.findOneAndDelete({ _id: req.params.id })
        if (!findmenu) {
            return res.status(422).json({ message: "ticket not found!" })
        }

        const findsub = await ticketModel.deleteMany({ parent: req.params.id })

        return res.json({ message: "ticket removed" })

    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
exports.removeAnswer = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const findmenu = await ticketModel.findOne({ _id: req.params.id })
        if (!findmenu) {
            return res.status(422).json({ message: "ticket not found!" })
        }

        if (findmenu.parent) {
            const findmenu = await ticketModel.findOneAndDelete({ _id: req.params.id })
            const update = await ticketModel.updateOne({ _id: findmenu.parent }, { answer: 0 })
        } else { return res.status(422).json({ message: "this is main ticket not answer" }) }


        return res.json({ message: "answer removed" })

    } catch (err) { return res.status(422).json(err.message); }
}
// test 1
