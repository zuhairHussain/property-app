var jwt = require("jsonwebtoken");
var config = require("../config");
const { ErrorHandler } = require('./errorHandler');

function verifyToken(req, res, next) {
  try {
    var token = req.headers["x-access-token"];
    if (!token)
      throw new ErrorHandler(401, 'No token provided.')
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err)
        throw new ErrorHandler(401, 'Failed to authenticate token.')
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    next(error)
  }
}

module.exports = verifyToken;