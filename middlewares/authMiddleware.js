const jwt = require('jsonwebtoken');
const userModel = require('./../models/userModel');
require("dotenv").config()

module.exports = async (req, res, next) => {
    try {
        const headers = req.header("Authorization")?.split(" ")
        if (headers?.length !== 2) {
            return res.status(403).json({ message: "This Route is Protect You cant Have Accsess it" })
        }

        const token = headers[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({ _id: decoded.id })

        const userobj = user.toObject()
        Reflect.deleteProperty(userobj, "Password")
        //console.log(userobj);
        req.user = userobj
        next();
    }
    catch (err) {
        return res.status(403).json(err)
    }


}
