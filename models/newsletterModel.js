const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: "string",
        required: true
    },
}, { timestamps: true });

const newslettermodel = mongoose.model("newsletter", schema)

module.exports = newslettermodel;

