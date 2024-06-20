const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('CommentModel', CommentSchema, 'tasksComments');
