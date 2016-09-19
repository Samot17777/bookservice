var express = require('express');
var app = express();

function logIncoming(req, res, next) {
    console.log("incoming request " + new Date());
    next();
}

app.get('/', logIncoming, function (req, res) {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});