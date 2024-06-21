const { validationResult, checkSchema } = require('express-validator');

const createHolidayValidation = async (req, res, next) => {
    try {
        await checkSchema({
            start: {
                errorMessage: 'Invalid start date',
                isString: true,
                notEmpty: true,
            },
            end: {
                errorMessage: 'Invalid end date',
                isString: true,
                notEmpty: true,
            }
        }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next({
                statusCode: 400,
                message: errors.array()
            });
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = createHolidayValidation;
