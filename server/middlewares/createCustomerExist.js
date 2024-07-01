const CustomerModel = require('../models/customer');

const createCustomerExist = async (req, res, next) => {
    try {
        const alreadyExist = await CustomerModel.findOne({ $or: [{ email: req.body.email }, { name: req.body.name }] });
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
