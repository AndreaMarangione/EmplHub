const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('CustomerModel', CustomerSchema, 'customers');
