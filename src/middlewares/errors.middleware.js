const errorsMiddleware = (error, req, res, next) => {
    res.statusCode = 400;
    res.send("Error");
    //next();
};

module.exports = errorsMiddleware;