const { validationResult, checkSchema } = require('express-validator');

const createTaskValidation = async (req, res, next) => {
    try {
        await checkSchema({
            employeeId: {
                errorMessage: 'Invalid employee Id',
                isArray: true,
                notEmpty: true,
            },
            customerId: {
                errorMessage: 'Invalid customer Id',
                isString: true,
                notEmpty: true,
            },
            title: {
                errorMessage: 'Invalid title',
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
                isString: true,
                notEmpty: true,
            },
            priority: {
                errorMessage: 'Invalid priority',
                isString: true,
                notEmpty: true,
            },
            end: {
                errorMessage: 'Invalid duration',
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
