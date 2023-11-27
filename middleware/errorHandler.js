const requestHandler = (req, res, next) => {
    const err = new Error(`Request URL ${req.path} not found`);
    err.statusCode = 404;
    next(err);
}
const errorHandler = (err, req, res, next) => {
    if(err.message == 'jwt expired') {
        err.statusCode = 401;
    }
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        error: err.message,
        stack: err.stack
    })
}

module.exports = {
    requestHandler,
    errorHandler
} 