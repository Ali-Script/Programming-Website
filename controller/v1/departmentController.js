const mongoose = require('mongoose');
const departmentModel = require("./../../models/departmentModel");
const subdepartmentModel = require("./../../models/department-subModel");

exports.add = async (req, res) => {
    try {

        const { title } = req.body;

        const find = await departmentModel.findOne({ title })
        if (find) return res.status(422).json({ message: 'Duplicated data !!' })

        const set = await departmentModel.create({ title })

        return res.json({ message: "success" })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.getall = async (req, res) => {
    try {
        const all = await departmentModel.find({}).sort({ _id: -1 }).lean()
        if (all.length === 0) return res.status(404).json({ message: 'no department find !!' })

        return res.json(all)
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.remove = async (req, res) => {
    try {
        const { id } = req.params

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const find = await departmentModel.findOneAndDelete({ _id: id })
        if (!find) return res.status(404).json({ message: "Not Found !! " })

        const findsub = await subdepartmentModel.deleteMany({ parent: req.params.id })

        return res.json({ message: "department deleted succ !!" })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.addsub = async (req, res) => {
    try {
        const { title } = req.body;
        const { parent } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(parent)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const findmenu = await departmentModel.findOne({ _id: parent })
        if (!findmenu) {
            return res.status(422).json({ message: "Parent department not found!" })
        }

        const findsub = await subdepartmentModel.findOne({ title })
        if (findsub) return res.status(422).json({ message: "Duplicated data !!" })

        const getAll = await subdepartmentModel.create({
            title,
            parent: parent,
        })
        return res.json({ message: "sub-department created succ" })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.getsubs = async (req, res) => {
    try {
        const all = await subdepartmentModel.find({}).sort({ _id: -1 }).lean()
        if (all.length === 0) return res.status(404).json({ message: 'no sub-department find !!' })

        return res.json(all)
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.removesub = async (req, res) => {
    try {
        const { id } = req.params

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const find = await subdepartmentModel.findOneAndDelete({ _id: id })
        if (!find) return res.status(404).json({ message: "Not Found !! " })

        return res.json({ message: "department deleted succ !!" })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1