const EmployeeModel = require('../models/employee');

const createEmployeeExist = async (req, res, next) => {
    try {
        const alreadyExist = await EmployeeModel.findOne({ email: req.body.email });
        if (alreadyExist) {
            next({
                statusCode: 409,
                message: 'This employee already exist',
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = createEmployeeExist;
