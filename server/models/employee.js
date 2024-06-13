const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
        default: 'p4$$w0rd'
    },
    dateOfBirthday: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://picsum.photos/100/100',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('EmployeeModel', EmployeeSchema, 'employees');
