const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: 'string',
            required: true,
        },
        phone: {
            type: 'string',
            required: true,
        },
        answerd: {
            type: 'string',
            default: 0
        },
        body: {
            type: 'string',
            required: true,
        },
    },
    { timestamps: true }
);

const contactUsModel = mongoose.model("contactUs", schema);

module.exports = contactUsModel;