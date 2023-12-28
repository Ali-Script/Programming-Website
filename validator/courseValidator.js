const validator = require('fastest-validator')
const v = new validator()

const schema = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["running", 'compelect', "presell"],
        required: true
    },
    teacher: {
        type: "ObjectId",
        required: true
    },
    category: {
        type: "ObjectId",
        required: true
    },
    off: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        default: 5
    },
    keywords: {
        type: String,
    }

}

const check = v.compile(schema);
module.exports = check