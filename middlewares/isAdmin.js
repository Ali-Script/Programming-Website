const jwt = require('jsonwebtoken');
const userModel = require('./../models/userModel');
require("dotenv").config()

module.exports = async (req, res, next) => {
    const isadmin = req.user.role === 'admin'
    // console.log(req.user);
    if (isadmin) {
        //console.log("object");
        return next();
    }
    return res.status(403).json({ message: "you can not have accsess to this route (only admins can)" })
}