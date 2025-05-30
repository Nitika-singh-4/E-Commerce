const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // Wrong MongoDB id
    if (err.name === "Cast Error") {
        const message = `Resources not found with this id.. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key
    if ( err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message , 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again later`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expired
    if (err.name === "TokenExpiredError") {
        const message = `Your Url is expired please try again Later!`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    }