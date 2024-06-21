const { validationResult, checkSchema } = require('express-validator');

const createCommentValidation = async (req, res, next) => {
    try {
        await checkSchema({
            task: {
                errorMessage: 'Invalid task id',
                isString: true,
                notEmpty: true,
            },
            comment: {
                errorMessage: 'Invalid comment',
                isString: true,
                notEmpty: true,
            }
        }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next({
                statusCode: 400,
                message: errors.array(),
            });
        }
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = createCommentValidation;
