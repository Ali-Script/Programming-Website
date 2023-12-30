const mongoose = require("mongoose");
const UserModel = require("./../../models/userModel");
const banUserModel = require("./../../models/banUserModel");
const validator = require('./../../validator/register');
const bcrypt = require("bcrypt")


exports.banUser = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(403).json({ message: "Object ID is not valid !!" })
        }

        const user = await UserModel.findById({ _id: req.params.id }).lean()
        if (!user) {
            return res.status(404).json({ message: "user not found !!" })
        }
        else if (user.role === 'admin') {
            return res.status(400).json({ message: "You Cant Ban Another Admins" })
        }

        const checkUser = await banUserModel.findOne({ email: user.email }).lean()
        if (checkUser) {
            return res.status(409).json({ message: "User already banned !!" })
        }

        const bbaann = banUserModel.create({ PhoneNum: user.PhoneNum, email: user.email });
        return res.json({ message: "User banned successfully !" })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
};
// test 1
exports.getAll = async (req, res) => {
    try {

        const allUsers = await UserModel.find({}).sort({ _id: -1 }).lean();
        if (allUsers.length === 0) return res.status(404).json({ message: "no user found !!" })

        allUsers.forEach(user => {
            delete user["Password"]
        })

        return res.json(allUsers)
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.removeOneUser = async (req, res) => {
    try {

        const { id } = req.params;
        const isvalidID = mongoose.Types.ObjectId.isValid(req.params)
        if (!isvalidID) {
            return res.status(403).json({ message: "Object ID is not valid !!" })
        }

        const checkUser = await UserModel.findById({ _id: req.params.id }).lean();
        if (!checkUser) {
            return res.status(404).json({ message: "User not found !!" })
        }
        else if (checkUser.role === 'admin') {
            return res.status(400).json({ message: "You Cant Remove Another Admins" })
        }



        const user = await UserModel.findOneAndRemove({ _id: id })

        return res.json({ message: `User Removed Succsessfully !!`, user })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }
}
// test 1
exports.makeAdmin = async (req, res) => {
    try {

        const isvalidID = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!isvalidID) {
            return res.status(403).json({ message: "Object ID is not valid !!" })
        }

        const checkUser = await UserModel.findById({ _id: req.params.id }).lean()
        if (!checkUser) {
            return res.status(403).json({ message: "Unknown User !!" })
        }
        else if (checkUser.role === 'admin') {
            return res.status(400).json({ message: "You Cant Update 'Admin' to 'Admin' " })
        }


        const user = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set:
                {
                    role: "admin"
                }
            }
        )

        return res.json({ message: `User Updated to Admin !!`, user })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }

}
// test 1
exports.humiliationToUser = async (req, res) => {


    try {
        const isvalidID = mongoose.Types.ObjectId.isValid(req.params)

        if (!isvalidID) {
            return res.status(422).json({ message: "Object ID is not valid !!" })
        }

        const checkUser = await UserModel.findById({ _id: req.params.id }).lean()
        if (!checkUser) {
            return res.status(422).json({ message: "Unknown User !!" })
        }

        if (checkUser.role === 'user') {
            return res.status(422).status(400).json({ message: "You Cant humiliation 'User' to 'User' " })
        }


        const user = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set:
                {
                    role: "user"
                }
            }
        )

        return res.json({ message: `User humiliation to User !!`, user })
    }
    catch (err) {
        return res.status(422).json({ message: err.message })
    }


}
// test 1
exports.changeInfo = async (req, res) => {
    try {

        const validationBody = validator(req.body);
        if (validationBody != true) {
            return res.status(422).json(validationBody)
        }

        const { UserName, Password, email, PhoneNum } = req.body;

        const hashedPassword = await bcrypt.hash(Password, 10)
        const count = await UserModel.count({})

        const user = await UserModel.findByIdAndUpdate({ _id: req.user._id }, {
            UserName,
            Password: `${hashedPassword}`,
            email,
            PhoneNum,
            role: count > 0 ? 'user' : 'admin'
        }).select("-Password").lean()

        return res.json({ message: "UserInfo Updated successfully !!", user })
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1

