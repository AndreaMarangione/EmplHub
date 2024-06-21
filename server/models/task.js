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
        required: false
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
        type: Number,
        enum: [1, 2, 3], //1 = high, 2 = medium, 3 = low
        required: true
    },
    started: {
        type: String,
        required: false
    },
    duration: {
        type: Number, //Day
        required: true
    },
    end: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Pending', 'In progress', 'Done'],
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('TaskModel', TaskSchema, 'task');
