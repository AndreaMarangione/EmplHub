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
    Logo: {
        type: String,
        default: 'https://picsum.photos/500/500',
        required: false
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel',
        required: false
    }]
}, { timestamps: true, strict: true })

module.exports = mongoose.model('CustomerModel', CustomerSchema, 'customers');
