const UserModel = require('./../../models/userModel');
const validator = require('./../../validator/register');
const banUserModel = require('./../../models/banUserModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Evalidator = require("email-validator");



exports.register = async (req, res) => {
    try {

        const validationBody = validator(req.body);
        if (validationBody != true) {
            return res.status(422).json(validationBody)
        }

        const { UserName, Password, email, PhoneNum } = req.body;

        if (!Evalidator.validate(email)) return res.status(422).json("E_mail Format Wrong !!");

        const findBanUsers = await banUserModel.findOne({ PhoneNum })

        if (findBanUsers) {
            return res.status(422).json({ message: "This Number Banned From Website ):" })
        }

        const ifDUPLC = await UserModel.findOne({
            $or: [{ UserName }, { email }]
        })

        if (ifDUPLC) {
            return res.status(409).json({ message: "User Name or Email is Duplicated" })
        }

        const hashedPass = await bcrypt.hash(Password, 10)
        const countUser = await UserModel.count();

        const user = await UserModel.create({
            UserName,
            Password: hashedPass,
            email,
            PhoneNum,
            role: countUser > 0 ? "user" : "admin"
        })
        const userObj = user.toObject();
        Reflect.deleteProperty(userObj, "Password")

        const accsessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "14 day" })
        return res.json({ userObj, accsessToken: accsessToken })

    } catch (err) { return res.status(422).json(err.message) }
}
exports.login = async (req, res) => {
    try {

        const { identifeir, password } = req.body;

        const user = await UserModel.findOne({
            $or: [{ UserName: identifeir }, { email: identifeir }]
        })

        if (!user) {
            return res.status(401).json({ message: "UserName or Email is Incrract !!" })
        }

        const checkPassword = await bcrypt.compare(password, user.Password)
        if (!checkPassword) {
            return res.status(401).json({ message: "Password is Incrract !!" })
        }

        const accsessToken = jwt.sign({ ID: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10 day"
        })

        return res.json({ message: "login Successfully (:", accsessToken })

    } catch (err) { return res.status(422).json(err.message) }
}
exports.getme = async (req, res) => {
    try {

        const user = req.user
        return res.json(user)

    } catch (err) { return res.status(422).json(err.message) }
}
