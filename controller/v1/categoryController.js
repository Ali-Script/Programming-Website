const mongoose = require("mongoose");
const categoryModel = require("./../../models/categoryModel");
const courseModel = require('./../../models/courseModel');
const validator = require('./../../validator/categoryValidator');
const bcrypt = require("bcrypt")

exports.setCategory = async (req, res) => {
    try {
        const { title, href } = req.body

        const validationBody = validator(req.body);
        if (validationBody != true) {
            return res.status(422).json(validationBody)
        }

        const duplicate = await categoryModel.findOne({ href })
        if (duplicate) {
            return res.status(422).json({ message: "Duplicated Data !!" })
        }

        const Category = await categoryModel.create({ title, href })
        return res.json({ message: "Category Document Created !", Category })
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.getOne = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const category = await categoryModel.findOne({ _id: req.params.id }).lean()
        if (!category) {
            return res.status(404).json({ message: "Category not found 404" })
        }

        return res.json(category)
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const category = await categoryModel.find({}).sort({ _id: -1 }).sort({ _id: -1 }).lean()

        if (category.length === 0) {
            return res.status(404).json({ message: "There in no Category !!" })
        }
        return res.json(category)
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1
exports.removeOne = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: 'Invalid Object ID' })
        }
        const category = await categoryModel.findOneAndRemove({ _id: req.params.id }).lean()
        if (!category) {
            return res.status(404).json({ message: "Category not found 404" })
        }
        return res.json({ message: "Category Removed !" })

    } catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1