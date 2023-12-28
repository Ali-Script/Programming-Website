const validator = require('fastest-validator')
const v = new validator()

const schema = {
    UserName: {
        type: 'string',
        min: 3,
        max: 30,
        required: true
    },
    Password: {
        type: 'string',
        min: 3,
        max: 30,
        required: true
    },
    confirmPassword: {
        type: "equal",
        field: 'Password',
    },
    email: {
        type: 'string',
        required: true,
    },
    PhoneNum: {
        type: 'string',

        required: true
    },
    $$strict: true
};

const check = v.compile(schema);
module.exports = check