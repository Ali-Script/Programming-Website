const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        PhoneNum: {
            type: "string",
            required: true,
        },
        email: {
            type: 'string',
            required: true,
        },
    },
    { timestamps: true }
);

const banUserModel = mongoose.model("banuser", schema);

module.exports = banUserModel;