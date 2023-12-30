const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    UserName: {
        type: 'string',
        required: true
    },
    Password: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,

    },
    role: {
        type: 'string',
        required: true,
        enum: ["admin", "user", "teacher"],
        default: 'user'
    },
    PhoneNum: {
        type: 'string',
        required: true
    },
}, { timestamps: true })


const UserModel = mongoose.model("User", schema)


module.exports = UserModel;