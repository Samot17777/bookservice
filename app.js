var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stockRepository = require('./stockRepository');

app.use(bodyParser.json());

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

var url = 'mongodb://localhost:27017/book_inventory_service';

app.post('/stock', function (req, res, next) {
    stockRepository.
        stockUp(req.body.isbn, req.body.count).
        then(function () {
            res.json({isbn: req.body.isbn, count: req.body.count});
        }).
        catch(next);
});

app.get('/stock', function (req, res, next) {
    stockRepository.
        findAll().
        then(function (results) {
            res.json(results);
        }).
        catch(next);
});

app.use(clientError);
app.use(serverError);

module.exports = app;