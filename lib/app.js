var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(stockRepository) {
    var app = express();
    var routes = require('./routes')(stockRepository);
    var middleware = require('./middleware');

    app.use(bodyParser.json());

    app.get('/', routes.hello);
    app.post('/stock', routes.stockUp);
    app.get('/stock', routes.findAll);
    app.get('/stock/:isbn', routes.getCount);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};