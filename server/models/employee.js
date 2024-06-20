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
        default: 'p4$$w0rd',
        required: false
    },
    personalPass: {
        type: Boolean,
        default: false,
        required: false
    },
    dateOfBirthday: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://picsum.photos/500/500',
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: false
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel',
        required: false
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel',
        required: false
    }],
    holiday: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HolidayModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('EmployeeModel', EmployeeSchema, 'employees');
