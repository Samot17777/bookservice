var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

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

app.get('/', logIncoming, function (req, res) {
    var url = 'mongodb://localhost:27017/book_inventory_service';

    MongoClient.connect(url, function (err, db) {
        console.log("Connected succesfully to DB");
        db.collection('books').updateOne({isbn: req.body.isbn}, {
            isbn: req.body.isbn,
            count: req.body.count
        }, {upsert: true});

        db.close();
    });

    res.json({isbn: req.body.isbn, count: req.body.count});

});

app.post('/stock', function (req, res) {
    var url = 'mongodb://localhost:27017/book_inventory_service';

    MongoClient.connect(url, function (err, db) {
        console.log("Connected succesfully to DB");
        db.collection('books').updateOne({isbn: req.body.isbn}, {
            isbn: req.body.isbn,
            count: req.body.count
        }, {upsert: true});

        db.close();
    });

    res.json({isbn: req.body.isbn, count: req.body.count});
});

app.use(clientError);
app.use(serverError);

module.exports = app;