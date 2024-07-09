const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    employeeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
    }],
    customerId: {
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
        }
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    started: {
        type: String,
        required: false
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Done'],
        default: 'Pending',
        required: false
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskCommentModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('TaskModel', TaskSchema, 'task');
