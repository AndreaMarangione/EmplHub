const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeModel',
        required: true
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
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
        required: false
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('HolidayModel', HolidaySchema, 'holidays');
