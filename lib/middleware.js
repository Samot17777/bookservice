var auth = require('basic-auth');
module.exports = {
    clientError: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    serverError: function (err, req, res, next) {
        console.error(err.stack);
        res.status(err.status || 500);
        res.json({ message: err.message, error: (process.env.NODE_ENV === 'production') ? {} : err.stack });
    },
    auth: function (username, password) {
        return function (req, res, next) {
            var credentials = auth(req);
            if (credentials && credentials.name === username && credentials.pass === password) {
                next();
            } else {
                res.setHeader('WWW-Authenticate', 'Basic realm=book inventory access');
                res.status(401).send('Access denied');
            }
        };
    }
};