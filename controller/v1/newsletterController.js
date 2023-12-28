const mongoose = require('mongoose');
const newsletterModel = require("./../../models/newsletterModel")
const Evalidator = require("email-validator");

exports.create = async (req, res) => {
    try {
        const { email } = req.body
        if (!Evalidator.validate(email)) return res.status(422).json("E_mail Format Wrong !!");

        const news = await newsletterModel.create({ email })

        return res.json(news)
    }
    catch (err) {
        return res.json({ error: err.message })
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {

        const news = await newsletterModel.find({}).sort({ _id: -1 }).lean()
        if (news.length === 0) return res.status(404).json({ message: "no newsletter found" })
        return res.json(news)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1