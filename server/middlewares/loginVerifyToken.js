const jwt = require('jsonwebtoken');

const loginVerifyToken = (req, res, next) => {
    const tokenHeaders = req.headers['authorization'];
    const token = tokenHeaders.split(' ')[1];
    if (!tokenHeaders.startsWith('Bearer') || !token) {
        next({
            status: 401,
            message: 'Unauthorized'
        })
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = loginVerifyToken;
