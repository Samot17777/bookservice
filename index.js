var express = require('express');
var app = express();

function logIncoming(req, res, next) {
    console.log("incoming request " + new Date());
    next();
}

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({
            message: err.message,
            error: (process.env.NODE_ENV === 'production') ? {} : err.stack
        }
    );
}

app.get('/', logIncoming, function (req, res) {
    throw new Error("ASDfsdaf");
    res.send('Hello World');
});

app.use(clientError);
app.use(serverError);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});