const { validationResult, checkSchema } = require('express-validator');

const createCustomerValidation = async (req, res, next) => {
    try {
        await checkSchema({
            name: {
                errorMessage: 'Invalid name',
                isString: true,
                notEmpty: true,
            },
            email: {
                errorMessage: 'Invalid email',
                isEmail: true,
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

module.exports = createCustomerValidation;
