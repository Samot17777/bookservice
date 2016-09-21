var app = require('./app.js')(require('./stockRepository'),require('./auth'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});