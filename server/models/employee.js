const mongoose = require('mongoose');

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
    personalPass: {
        type: Boolean,
        required: false,
        default: false
    },
    dateOfBirthday: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://picsum.photos/500/500',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel'
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('EmployeeModel', EmployeeSchema, 'employees');
