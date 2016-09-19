var request = require('supertest');
var assert = require('assert');

it('allows to stock up the items', function (done) {
    var app = require('../lib/app.js')(require('../lib/inMemoryStockRepository')());

    request(app).
        post('/stock').
        send({isbn: '1234', count: 10}).
        expect('Content-Type', /json/).
        expect(200, {isbn: '1234', count: 10}, done);
});

it('allows to check book availability', function (done) {
    var repository = require('../lib/inMemoryStockRepository')();
    repository._items([{isbn: '1234', count: 1}]);
    var app = require('../lib/app.js')(repository);

    request(app).
        get('/stock/1234').
        expect(200, {count: 1}, done);
});