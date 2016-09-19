module.exports = {
    clientError: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    serverError: function (err, req, res, next) {
        console.error(err.stack);
        res.status(err.status || 500);
        res.json({message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack});
    }
};