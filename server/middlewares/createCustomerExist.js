const CustomerModel = require('../models/customer');

const createCustomerExist = async (req, res, next) => {
    try {
        const alreadyExist = await CustomerModel.findOne({ email: req.body.email });
        if (alreadyExist) {
            next({
                status: 409,
                message: 'This customer already exist',
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = createCustomerExist;
