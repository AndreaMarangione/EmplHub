const adminRoleVerify = (req, res, next) => {
    if (req.user.role !== 'admin') {
        next({
            statusCode: 401,
            message: 'Unauthorized to do this action'
        });
    }
    next();
}

module.exports = adminRoleVerify;
