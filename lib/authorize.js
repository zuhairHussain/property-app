const { ErrorHandler } = require('./errorHandler');

function authorize(roles = []) {
        if (typeof roles === 'string') {
            roles = [roles];
        }
        return [
            (req, res, next) => {
                try {
                    if (roles.length && !roles.includes(req.role)) {
                        // user's role is not authorized
                        throw new ErrorHandler(401, 'Unauthorized');
                    }
                    next();
                } catch (error) {
                    next(error)
                }
            }
        ];
}

module.exports = authorize;