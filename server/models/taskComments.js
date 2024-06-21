const mongoose = require('mongoose');

const TaskCommentSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('TaskCommentModel', TaskCommentSchema, 'tasksComments');
