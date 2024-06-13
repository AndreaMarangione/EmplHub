const mongoose = require('mongoose');

const connDB = () => {
    try {
        mongoose.connect(process.env.DB_URL + process.env.DB_NAME);
        const db = mongoose.connection;
        db.on('error',
            console.error.bind(console, 'Database connection error!'));
        db.once('open', () => {
            console.log('Database connection done');
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connDB };
