const { validationResult, checkSchema } = require('express-validator');

const createTaskValidation = async (req, res, next) => {
    try {
        await checkSchema({
            employeeId: {
                errorMessage: 'Invalid employee Id',
                isString: true,
                notEmpty: true,
            },
            year: {
                errorMessage: 'Invalid year',
                isString: true,
                notEmpty: true,
            },
            description: {
                errorMessage: 'Invalid description',
                isString: true,
                notEmpty: true,
            },
            amount: {
                errorMessage: 'Invalid amount',
                isObject: true,
                notEmpty: true,
            },
            priority: {
                errorMessage: 'Invalid priority',
                isNumeric: true,
                notEmpty: true,
            },
            duration: {
                errorMessage: 'Invalid duration',
                isNumeric: true,
                notEmpty: true,
            },
            status: {
                errorMessage: 'Invalid status',
                isString: true,
                notEmpty: true,
            },
        }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next({
                status: 400,
                message: errors.array(),
            });
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = createTaskValidation;
