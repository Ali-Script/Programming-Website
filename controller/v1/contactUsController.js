const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const contactUs = require("./../../models/contactUsModel")
const validator = require("./../../validator/contactusValidator")
const Evalidator = require("email-validator");

exports.set = async (req, res) => {
    try {

        const validationBody = validator(req.body);
        if (validationBody != true) {
            return res.status(422).json(validationBody)
        }

        const { body } = req.body;
        const user = req.user;

        const modell = await contactUs.create({
            name: user.UserName,
            email: user.email,
            phone: user.PhoneNum,
            body,
        })
        return res.json(modell)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.getAll = async (req, res) => {
    try {
        const all = await contactUs.find({}).sort({ _id: -1 }).lean()

        if (all.length === 0) {
            return res.status(422).json({ message: 'No Contacts Found !!' })
        }

        return res.json(all)
    }
    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1
exports.remove = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const { id } = req.params;

        const findmsg = await contactUs.findOneAndDelete({ _id: id })
        if (!findmsg) {
            return res.status(404).json({ message: "message not found !!" })
        }

        const msg = await contactUs.findOneAndDelete({ _id: id })
        return res.json({ message: "message removed !!" })
    }
    catch (err) {
        return res.json({ error: err.message })
    }
}
// test 1
exports.answer = async (req, res) => {
    try {

        const { email, answer } = req.body

        if (!Evalidator.validate(email)) return res.status(422).json("E_mail Format Wrong !!");

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ex@gmail.com", // your gmail
                pass: "your app password" // your app password
            }
        })

        const mailOptions = {
            from: "ex@gmail.com", // your gmail
            to: req.body.email, // send to 
            subject: "contactUs", // email subject
            text: req.body.answer, // email body
        }

        transport.sendMail(mailOptions, async (e, i) => {
            if (e) {
                return res.status(422).json({ error: e.message })
            }
            else {
                const x = await contactUs.updateOne({ email: req.body.email }, { answerd: 1 })
                return res.json({ message: "succ" })
            }
        })

    }

    catch (err) {
        return res.status(422).json({ error: err.message })
    }
}
// test 1