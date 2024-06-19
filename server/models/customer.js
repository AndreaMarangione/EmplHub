const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Logo: {
        type: String,
        required: false,
        default: 'https://picsum.photos/500/500',
    },
    jobs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel'
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('CustomerModel', CustomerSchema, 'customers');
