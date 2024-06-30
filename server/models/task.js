const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    employeeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
    }],
    year: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerModel',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        total: {
            type: String,
            required: true
        },
        invoice: {
            type: String,
            required: true
        },
        residual: {
            type: String,
            required: true
        },
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true
    },
    started: {
        type: String,
        required: false
    },
    end: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In progress', 'Done'],
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskCommentModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('TaskModel', TaskSchema, 'task');
