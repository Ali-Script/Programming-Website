const mongoose = require('mongoose');
const notificationModel = require("./../../models/notificationModel")
const userModel = require("./../../models/userModel")


exports.send = async (req, res) => {
    try {
        const { message, adminID } = req.body
        const validate = mongoose.Types.ObjectId.isValid(adminID)

        const user = await userModel.findOne({ _id: adminID }).lean();
        if (!user) return res.status(404).json({ message: 'User not found' })

        const notif = await notificationModel.create({
            message,
            adminID,
            sendBy: req.user._id
        })
        return res.json(notif)
    }
    catch (err) { return res.status(422).json({ message: err.message }); }
}
// test 1
exports.get = async (req, res) => {
    try {
        const getNotif = await notificationModel.find({ adminID: req.user._id }).sort({ _id: -1 }).lean()
        await notificationModel.updateMany({ adminID: req.user._id }, { seen: 1 })
        return res.json(getNotif)
    }
    catch (err) { return res.status(422).json({ message: err.message }); }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const getNotif = await notificationModel.find({}).sort({ _id: -1 }).lean()
        return res.json(getNotif)
    }
    catch (err) { return res.status(422).json({ message: err.message }); }
}// test 1
exports.remove = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const getNotif = await notificationModel.findOneAndDelete({ _id: req.params.id }).lean()
        if (!getNotif) return res.status(404).json({ message: "Notif not found !!" })

        return res.json(getNotif)
    }
    catch (err) { return res.status(422).json({ message: err.message }); }
}
// test 1

